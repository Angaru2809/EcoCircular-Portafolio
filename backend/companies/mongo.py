import os
from pathlib import Path

from dotenv import load_dotenv
from pymongo import MongoClient

# Identifica la carpeta raiz del backend.
BASE_DIR = Path(__file__).resolve().parent.parent

# Carga las variables del archivo .env.
load_dotenv(BASE_DIR / ".env")

# Lee la URI de conexion a MongoDB Atlas.
MONGODB_URI = os.getenv("MONGODB_URI")

# Lee el nombre de la base de datos; si no existe, usa un valor por defecto.
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "ecored_circular_db")

# Crea el cliente de conexion a MongoDB.
client = MongoClient(MONGODB_URI)

# Selecciona la base de datos que utilizara la aplicacion.
db = client[MONGODB_DB_NAME]

# Expone la coleccion de empresas.
companies_collection = db["companies"]

# Expone la coleccion de publicaciones de materiales.
material_listings_collection = db["material_listings"]
