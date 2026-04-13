from datetime import datetime, timezone

from django.core.management.base import BaseCommand

from companies.mongo import companies_collection, material_listings_collection


class Command(BaseCommand):
    # Describe brevemente la funcion del comando.
    help = "Crea datos demo en MongoDB"

    def handle(self, *args, **kwargs):
        # Verifica si ya existe una empresa demo con el mismo NIT.
        existing = companies_collection.find_one({"nit": "900000001"})

        # Si no existe, crea datos iniciales de prueba.
        if not existing:
            # Inserta una empresa de ejemplo.
            result = companies_collection.insert_one(
                {
                    "owner_uid": "demo-owner",
                    "name": "EcoRed Demo",
                    "nit": "900000001",
                    "city": "Bogota",
                    "sector": "Manufactura",
                    "created_at": datetime.now(timezone.utc).isoformat(),
                }
            )

            # Inserta una publicacion asociada a la empresa creada.
            material_listings_collection.insert_one(
                {
                    "company_id": result.inserted_id,
                    "material_type": "Carton",
                    "quantity": 80,
                    "unit": "kg",
                    "location": "Bogota",
                    "status": "available",
                    "published_by": "demo-owner",
                    "created_at": datetime.now(timezone.utc).isoformat(),
                }
            )

        # Muestra un mensaje de confirmacion en consola.
        self.stdout.write(self.style.SUCCESS("Datos demo creados en MongoDB"))
