import sys

# Add the submodule to the list of paths. This way, we can import rgbmatrix.
sys.path.insert(0, '/home/pi/ipwa/matrix')

from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
from rgbmatrix import Adafruit_RGBmatrix


class SimpleEcho(WebSocket):

    def handleMessage(self):
        # echo message back to client
        self.sendMessage(self.data)

    def handleConnected(self):
        print self.address, 'connected'

    def handleClose(self):
        print self.address, 'closed'

print "Loaded!"
print Adafruit_RGBmatrix

server = SimpleWebSocketServer('', 1337, SimpleEcho)
server.serveforever()
