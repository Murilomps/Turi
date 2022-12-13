import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import math

url_moletons = 'https://www.google.com/search?q=moletom&sa=N&biw=1366&bih=625&tbm=shop&ei=m9SIY6rHBI7T1sQPxbC38AM&ved=0ahUKEwjqgO3w6dj7AhWOqZUCHUXYDT448AEQ4dUDCAg&uact=5&oq=moletom&gs_lcp=Cgtwcm9kdWN0cy1jYxADMgoIABCxAxCDARBDMgoIABCxAxCDARBDMgoIABCxAxCDARBDMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyCwgAEIAEELEDEIMBMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyCwgAEIAEELEDEIMBMgUIABCABDoICAAQgAQQsAM6BAgAEENKBAhBGAFQpghYkA9g0xRoA3AAeACAAWuIAY4FkgEDNi4xmAEAoAEByAEKwAEB&sclient=products-cc'
url2_moletons = 'https://www.google.com/search?q=moletom&tbs=vw:g&tbm=shop&ei=sNeIY6roMM3d5OUPh_6imAs&start=60&sa=N&ved=0ahUKEwiqgLbp7Nj7AhXNLrkGHQe_CLMQ8tMDCOIQ&biw=1366&bih=625&dpr=1'
url3_moletons = 'https://www.google.com/search?q=moletom&tbs=vw:g&tbm=shop&ei=XdiIY4j8JJDB5OUPr7eMmAg&start=120&sa=N&ved=0ahUKEwjInum77dj7AhWQILkGHa8bA4M4tAEQ8tMDCM0Q&biw=1366&bih=625&dpr=1'
url4_moletons = 'https://www.google.com/search?q=moletom&tbs=vw:g&tbm=shop&ei=cNiIY6yXO8HB5OUPyoWu0Ag&start=180&sa=N&ved=0ahUKEwisj4fF7dj7AhXBILkGHcqCC4o4eBDy0wMI-w8&biw=1366&bih=625&dpr=1'
url5_moletons = 'https://www.google.com/search?q=moletom&tbs=vw:g&tbm=shop&ei=k9iIY5qLC8Gd5OUPrca-mAw&start=240&sa=N&ved=0ahUKEwjaoK_V7dj7AhXBDrkGHS2jD8M4tAEQ8tMDCNEQ&biw=1366&bih=625&dpr=1'

headers = {'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"}

site = requests.get(url_moletons, headers=headers)
soup = BeautifulSoup(site.content, "html.parser")

moletons = soup.find_all('div', class_ = re.compile('sh-dgr__content'))

dic_produtos = {'Marca':[], 'Preço':[]}

print('| ----- MOLETONS ----- |')

for moletom in moletons:
        
    marca = moletom.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = moletom.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for moletom in moletons:
    
    site = requests.get(url2_moletons, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = moletom.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = moletom.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for moletom in moletons:
    
    site = requests.get(url3_moletons, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = moletom.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = moletom.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for moletom in moletons:
    
    site = requests.get(url4_moletons, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = moletom.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = moletom.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for moletom in moletons:
    
    site = requests.get(url5_moletons, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = moletom.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = moletom.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

df = pd.DataFrame(dic_produtos)
#df.to_csv('C:\\Users\\Aluno\\Documents\\WebCrawller-Scraping\\precos_moletons.csv', encoding='utf-8', sep=';')
#df.to_csv('/home/ubuntu/WebCrawller-Scraping/precos_moletons.csv', encoding='utf-8', sep=';')
#df.to_csv('/home/wilker/Documentos/WebCrawller-Scraping/precos_moletons.csv', encoding='utf-8', sep=';')

#tabela = df.to_html('C:\\Users\\Aluno\\Documents\\Turi\\public\\tabela_moletons.html', encoding='utf-8')
#tabela = df.to_html('/home/ubuntu/WebCrawller-Scraping/tabela_moletons.html', encoding='utf-8')
#tabela = df.to_html('/home/wilker/Documentos/WebCrawller-Scraping/tabela_moletons.html', encoding='utf-8')