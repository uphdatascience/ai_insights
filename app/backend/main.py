import os

from app import create_app
from load_azd_env import load_azd_env

import logging
logging.basicConfig(level=logging.ERROR)

print("Starting backend app...")

# WEBSITE_HOSTNAME is always set by App Service, RUNNING_IN_PRODUCTION is set in main.bicep
RUNNING_ON_AZURE = os.getenv("WEBSITE_HOSTNAME") is not None or os.getenv("RUNNING_IN_PRODUCTION") is not None


print(f"Running on Azure? {RUNNING_ON_AZURE}")

if not RUNNING_ON_AZURE:
    load_azd_env()
    print("OPENAI_API_KEY loaded:", os.getenv("OPENAI_API_KEY") is not None)
    print("Loaded .env")

app = create_app()
print("Created app instance")


if __name__ == "__main__":
    print("Running app.run()")
    app.run(debug=False)