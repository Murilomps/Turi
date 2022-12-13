import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import math

url_croppeds = 'https://www.google.com/search?q=cropped&source=lnms&tbm=shop&sa=X&ved=2ahUKEwiklNOV4Nj7AhVDILkGHUudDy8Q_AUoAXoECAIQAw&biw=1366&bih=625&dpr=1'
url2_croppeds = 'https://www.google.com/search?q=cropped&tbs=vw:g&tbm=shop&ei=cMqIY7CdBKbc5OUPmaapuA0&start=60&sa=N&ved=0ahUKEwiwldKX4Nj7AhUmLrkGHRlTCtcQ8tMDCOkQ&biw=1366&bih=625&dpr=1'
url3_croppeds = 'https://www.google.com/search?q=cropped&tbs=vw:g&tbm=shop&ei=oc6IY8fEEMen5OUPhKaauAc&start=120&sa=N&ved=0ahUKEwiHmbGX5Nj7AhXHE7kGHQSTBnc4PBDy0wMI5g8&biw=1366&bih=625&dpr=1'
url4_croppeds = 'https://www.google.com/search?q=cropped&tbs=vw:g&tbm=shop&ei=t86IY-qqM-a-5OUPkdc4&start=180&sa=N&ved=0ahUKEwiq4pKi5Nj7AhVmH7kGHZErDgA4eBDy0wMIsQ8&biw=1366&bih=625&dpr=1'
url5_croppeds = 'https://www.google.com/search?q=cropped&tbs=vw:g&tbm=shop&ei=y86IY4qsDfG85OUP8K-2gA0&start=240&sa=N&ved=0ahUKEwjKvbGr5Nj7AhVxHrkGHfCXDdA4tAEQ8tMDCOcO&biw=1366&bih=625&dpr=1'

headers = {'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"}

site = requests.get(url_croppeds, headers=headers)
soup = BeautifulSoup(site.content, "html.parser")

croppeds = soup.find_all('div', class_ = re.compile('sh-dgr__content'))

dic_produtos = {'Marca':[], 'Preço':[]}

print('| ----- CROPPED ----- |')

for cropped in croppeds:
        
    marca = cropped.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = cropped.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for cropped in croppeds:
    
    site = requests.get(url2_croppeds, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = cropped.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = cropped.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for cropped in croppeds:
    
    site = requests.get(url3_croppeds, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = cropped.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = cropped.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for cropped in croppeds:
    
    site = requests.get(url4_croppeds, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = cropped.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = cropped.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for cropped in croppeds:
    
    site = requests.get(url5_croppeds, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = cropped.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = cropped.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

df = pd.DataFrame(dic_produtos)
#df.to_csv('C:\\Users\\Aluno\\Documentos\\WebCrawller-Scraping\\precos_croppeds.csv', encoding='utf-8', sep=';')
#df.to_csv('/home/ubuntu/WebCrawller-Scraping/precos_croppeds.csv', encoding='utf-8', sep=';')
#df.to_csv('/home/wilker/Documentos/WebCrawller-Scraping/precos_croppeds.csv', encoding='utf-8', sep=';')

#tabela = df.to_html('C:\\Users\\Aluno\\Documents\\WebCrawller-Scraping\\tabela_croppeds.html', encoding='utf-8')
#tabela = df.to_html('/home/ubuntu/WebCrawller-Scraping/tabela_croppeds.html', encoding='utf-8')
#tabela = df.to_html('/home/wilker/Documentos/WebCrawller-Scraping/tabela_croppeds.html', encoding='utf-8')