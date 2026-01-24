from django.shortcuts import render
import json
import math

import asyncio
from fastapi import FastAPI, WebSocket

def mainpage(request):
    app = FastAPI()

    @app.websocket("/ws")
    async def websocket_endpoint(websocket: WebSocket):
        await websocket.accept()
        angle = 0
        while True:
            # Perform your calculation here
            x = 100 * math.cos(angle)
            y = 100 * math.sin(angle)

            # Send it to the browser
            await websocket.send_json({"x": x, "y": y})

            angle += 0.05
            await asyncio.sleep(0.01)  # Controls the "server-side" framerate

    return render(request, 'mainpage/mainpage.html')

