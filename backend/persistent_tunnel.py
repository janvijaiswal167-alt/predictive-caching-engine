"""
Persistent Tunnel Daemon for Predictive Cloud-Cost Caching Engine.
Continuously maintains and auto-reconnects an active public tunnel via SSH / localhost.run.
"""
import subprocess
import time
import re
import sys
import os

TUNNEL_PORT = 3001
URL_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public_url.txt")

def start_persistent_tunnel():
    print(f">> Starting persistent auto-reconnecting tunnel on port {TUNNEL_PORT}...")
    while True:
        try:
            cmd = [
                "ssh",
                "-R", f"80:localhost:{TUNNEL_PORT}",
                "-o", "StrictHostKeyChecking=no",
                "-o", "ServerAliveInterval=10",
                "-o", "ServerAliveCountMax=120",
                "-o", "ExitOnForwardFailure=yes",
                "nokey@localhost.run"
            ]
            process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1
            )

            for line in iter(process.stdout.readline, ''):
                print(line, end='', flush=True)
                match = re.search(r'(https://[a-zA-Z0-9\-]+\.lhr\.life)', line)
                if match:
                    url = match.group(1)
                    print(f"\n=======================================================")
                    print(f">> ACTIVE PUBLIC HTTPS LINK: {url}")
                    print(f"=======================================================\n", flush=True)
                    with open(URL_FILE, "w", encoding="utf-8") as f:
                        f.write(url)

            process.wait()
            print(f">> Tunnel process exited with code {process.returncode}. Auto-reconnecting in 2 seconds...")
            time.sleep(2)
        except Exception as e:
            print(f">> Tunnel exception: {e}. Retrying in 3 seconds...")
            time.sleep(3)

if __name__ == "__main__":
    start_persistent_tunnel()
