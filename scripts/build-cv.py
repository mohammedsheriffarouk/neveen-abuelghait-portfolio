"""Regenerates the CV PDFs from the site's data.
Usage: npm run build && python3 scripts/build-cv.py   (needs: pip install playwright && playwright install chromium)
Writes public/assets/documents/cv-ar.pdf and cv-en.pdf — run `npm run build` again afterwards so dist/ gets them.
"""
import subprocess, sys, time, pathlib, os
root = pathlib.Path(__file__).resolve().parent.parent
from playwright.sync_api import sync_playwright
srv = subprocess.Popen([sys.executable, '-m', 'http.server', '4199', '-d', str(root / 'dist')], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
try:
    with sync_playwright() as p:
        exe = os.environ.get('CHROME_PATH')
        br = p.chromium.launch(**({'executable_path': exe} if exe else {}), args=['--no-sandbox'])
        for loc in ['ar', 'en']:
            pg = br.new_page()
            pg.goto(f'http://localhost:4199/#/cv-print/{loc}')
            pg.wait_for_timeout(500)
            pg.evaluate("Promise.all([document.fonts.load('400 16px Amiri', 'نص'), document.fonts.load('700 16px Amiri', 'نص'), document.fonts.load('400 16px \"IBM Plex Sans Arabic\"', 'Aa')]).then(() => document.fonts.ready)")
            pg.wait_for_timeout(500)
            pg.pdf(path=str(root / 'public/assets/documents' / f'cv-{loc}.pdf'), format='A4', print_background=True, margin={'top': '0', 'bottom': '0', 'left': '0', 'right': '0'})
            print('wrote', f'cv-{loc}.pdf')
        br.close()
finally:
    srv.terminate()
