from .base import *
import os

# Check for a specific environment variable to determine the environment
if os.environ['myproject'] == 'prod':
   from .production import *
else:
   from .development import *