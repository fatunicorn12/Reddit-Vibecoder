FROM python:3.11-slim
WORKDIR /app

# ---- Install Chrome, Pygame, and GUI dependencies ----
RUN apt-get update && apt-get install -y \
    wget curl gnupg unzip \
    # --- Chrome + GUI dependencies ---
    fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 \
    libcups2 libdbus-1-3 libdrm2 libgbm1 libnspr4 libnss3 \
    libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils \
    libxext6 libxrender1 libgl1 libglib2.0-0 libpango-1.0-0 libpangocairo-1.0-0 \
    libxkbcommon0 libxcb1 libxfixes3 \
    # --- Pygame (SDL2) dependencies ---
    python3-dev libsdl2-dev libsdl2-image-dev libsdl2-mixer-dev libsdl2-ttf-dev \
    && mkdir -p /usr/share/keyrings \
    && curl -fsSL https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-linux-signing-keyring.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-linux-signing-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y google-chrome-stable || true \
    && rm -rf /var/lib/apt/lists/*

# ---- Install Python dependencies ----
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# ---- Copy rest of your project ----
COPY . /app

# ---- Default command ----
CMD ["python", "main.py"]
