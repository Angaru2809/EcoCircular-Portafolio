import logging
import os
from pathlib import Path

import firebase_admin
from dotenv import load_dotenv
from firebase_admin import auth, credentials
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication

logger = logging.getLogger(__name__)

# Calcula la carpeta base del backend.
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
if not cred_path:
    raise RuntimeError("FIREBASE_CREDENTIALS_PATH no está definido en el archivo .env")

credentials_path = Path(cred_path)
if not credentials_path.is_absolute():
    credentials_path = (BASE_DIR / credentials_path).resolve()

if not firebase_admin._apps:
    cred = credentials.Certificate(str(credentials_path))
    firebase_admin.initialize_app(cred)
    logger.info("Firebase Admin inicializado correctamente")


class FirebaseUser:
    # Usuario mínimo compatible con IsAuthenticated de DRF.
    def __init__(self, uid, email=None):
        self.uid = uid
        self.email = email
        self.is_authenticated = True

    def __str__(self):
        return self.email or self.uid


class FirebaseAuthentication(BaseAuthentication):
    # Valida tokens Bearer emitidos por Firebase.
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        logger.info(f"Authorization presente: {bool(auth_header)}")

        if not auth_header:
            return None

        if not auth_header.startswith("Bearer "):
            logger.warning("Cabecera Authorization mal formada")
            raise exceptions.AuthenticationFailed("Token mal formado")

        id_token = auth_header.split("Bearer ", 1)[1].strip()
        if not id_token:
            logger.warning("La cabecera Authorization no contiene token")
            raise exceptions.AuthenticationFailed("Token vacio")

        try:
            decoded_token = auth.verify_id_token(id_token)
            request.firebase_user = decoded_token

            user = FirebaseUser(
                uid=decoded_token.get("uid"),
                email=decoded_token.get("email"),
            )
            logger.info(f"Token valido para uid: {user.uid}")
            return (user, id_token)
        except Exception as e:
            logger.exception(f"Error validando token de Firebase: {e}")
            raise exceptions.AuthenticationFailed("Token invalido")
