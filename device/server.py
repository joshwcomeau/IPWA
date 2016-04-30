import sys
import time

# Add the submodule to the list of paths. This way, we can import rgbmatrix.
sys.path.insert(0, '/home/pi/ipwa/matrix')

from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
from rgbmatrix import Adafruit_RGBmatrix

matrix = Adafruit_RGBmatrix(16, 1)




class SimpleEcho(WebSocket):

    def handleMessage(self):
        values = eval(self.data, {'os': None})
        for rowIndex, row in enumerate(values):
            for colIndex, col in enumerate(row):
                r = col[0]
                g = col[1]
                b = col[2]

                matrix.SetPixel(colIndex, rowIndex, r, g, b)


    def handleConnected(self):
        print self.address, 'connected'

    def handleClose(self):
        print self.address, 'closed'

server = SimpleWebSocketServer('', 1337, SimpleEcho)
server.serveforever()
