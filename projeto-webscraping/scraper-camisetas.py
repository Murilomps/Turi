import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import math
import csv

url_camisetas = 'https://www.google.com/search?q=camiseta+de+algod%C3%A3o&sa=N&biw=1366&bih=625&tbm=shop&ei=6c6IY_6dG5q_5OUPh_imsA0&ved=0ahUKEwi-tua55Nj7AhWaH7kGHQe8CdY48AEQ4dUDCAg&uact=5&oq=camiseta+de+algod%C3%A3o&gs_lcp=Cgtwcm9kdWN0cy1jYxADMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoNCAAQsQMQgwEQsAMQQzoOCAAQgAQQsQMQgwEQsAM6BAgAEEM6CwgAEIAEELEDEIMBSgQIQRgBUIIHWPpAYPVGaANwAHgAgAFxiAHODZIBBDE5LjGYAQCgAQHIAQrAAQE&sclient=products-cc'
url2_camisetas = 'https://www.google.com/search?q=camiseta+de+algod%C3%A3o&tbs=vw:g&tbm=shop&ei=atKIY-YizuDWxA_H5bi4BQ&start=60&sa=N&ved=0ahUKEwjm_6fl59j7AhVOsJUCHccyDlcQ8tMDCNoQ&biw=1366&bih=625&dpr=1'
url3_camisetas = 'https://www.google.com/search?q=camiseta+de+algod%C3%A3o&tbs=vw:g&tbm=shop&ei=VNSIY-TlEvrW1sQPz7SF-AE&start=120&sa=N&ved=0ahUKEwjk343P6dj7AhV6q5UCHU9aAR84PBDy0wMIkBE&biw=1366&bih=625&dpr=1'
url4_camisetas = 'https://www.google.com/search?q=camiseta+de+algod%C3%A3o&tbs=vw:g&tbm=shop&ei=ZtSIY4vrKqKy1sQPy-Yw&start=180&sa=N&ved=0ahUKEwiLtvDX6dj7AhUimZUCHUszDAA4eBDy0wMIwBA&biw=1366&bih=625&dpr=1'
url5_camisetas = 'https://www.google.com/search?q=camiseta+de+algod%C3%A3o&tbs=vw:g&tbm=shop&ei=iNSIY-m8I-_L1sQP4NyqkAE&start=240&sa=N&ved=0ahUKEwjpoITo6dj7AhXvpZUCHWCuChI4tAEQ8tMDCJ8Q&biw=1366&bih=625&dpr=1'

headers = {'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"}
site = requests.get(url_camisetas, headers=headers)
soup = BeautifulSoup(site.content, "html.parser")  
camisetas = soup.find_all('div', class_ = re.compile('sh-dgr__content'))
dic_produtos = {'Marca':[], 'Preço':[]}

print('| ----- CAMISETAS DE ALGODÃO ----- |')

for camiseta in camisetas:

    marca = camiseta.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = camiseta.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for camiseta in camisetas:
    
    site = requests.get(url2_camisetas, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = camiseta.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = camiseta.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for camiseta in camisetas:
    
    site = requests.get(url3_camisetas, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = camiseta.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = camiseta.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for camiseta in camisetas:
    
    site = requests.get(url4_camisetas, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = camiseta.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = camiseta.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for camiseta in camisetas:
    
    site = requests.get(url5_camisetas, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = camiseta.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = camiseta.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)


df = pd.DataFrame(dic_produtos)
#df.to_csv('C:\\Users\\Aluno\\Documents\\WebCrawller-Scraping\\precos_camisetas.csv', encoding='utf-8', sep=';')
#df.to_csv('/home/ubuntu/WebCrawller-Scraping/precos_camisetas.csv', encoding='utf-8', sep=';')
#df.to_csv('/home/wilker/Documentos/WebCrawller-Scraping/precos_camisetas.csv', encoding='utf-8', sep=';')

#tabela = df.to_html('C:\\Users\\Aluno\\Documents\\WebCrawller-Scraping\\tabela_camisetas.html', encoding='utf-8')
#tabela = df.to_html('/home/ubuntu/WebCrawller-Scraping/tabela_camisetas.html', encoding='utf-8')
#tabela = df.to_html('/home/wilker/Documentos/WebCrawller-Scraping/tabela_camisetas.html', encoding='utf-8')