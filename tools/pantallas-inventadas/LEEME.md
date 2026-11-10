# Pantallas inventadas

`motor.html` es el motor de reservas de un hotel INVENTADO (Hotel Los Álamos, Valle Escondido), con la estética del motor real de Racimo. Racimo dio el OK para inventar el hotel. Se pidió en la Revisión 2: «una imagen más general del motor».

`render.py` lo saca con Chrome a 2x (escritorio, 3840×2000) y a 3x (celular, 1170 de ancho), y genera `video/comun/real/mo-motor-v2.webp` y `mo-motor-cel-v2.webp`. Las fotos salen de los originales en alta de la carpeta de fotos de Racimo; la ruta está en el script.

    python render.py <carpeta de motor.html> <repo>/video/comun/real
    bash tools/video/build-real.sh MOTOR motor
