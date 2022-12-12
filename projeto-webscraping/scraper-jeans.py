import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import math

url_jeans = 'https://www.google.com/search?q=jeans&source=lnms&tbm=shop&sa=X&ved=2ahUKEwjX1oHw-dX7AhXhJbkGHU8pDywQ_AUoAnoECAEQBA&biw=1366&bih=625&dpr=1'
url2_jeans = 'https://www.google.com/search?q=jeans&tbs=vw:g&tbm=shop&ei=aWCHY-2bBoDA5OUPveefkAI&start=60&sa=N&ved=0ahUKEwit9O72htb7AhUAILkGHb3zByIQ8tMDCMsQ&biw=1366&bih=625&dpr=1'
url3_jeans = 'https://www.google.com/search?q=jeans&tbs=vw:g&tbm=shop&ei=7WyHY9TmIOez5OUPtZe_iAQ&start=120&sa=N&ved=0ahUKEwiUke7uktb7AhXnGbkGHbXLD0E4PBDy0wMIgBA&biw=1366&bih=625&dpr=1'
url4_jeans = 'https://www.google.com/search?q=jeans&tbs=vw:g&tbm=shop&sxsrf=ALiCzsbtSt-A3nq8KouuXkduNV2og5colg:1669847128563&ei=WNiHY7rVIeCQ4dUP8IyT8Aw&start=180&sa=N&ved=0ahUKEwi64bSn-db7AhVgSLgEHXDGBM4Q8tMDCJYV&biw=1366&bih=664&dpr=1'
url5_jeans = 'https://www.google.com/search?q=jeans&tbs=vw:g&tbm=shop&sxsrf=ALiCzsaGe3r8tDckiMc1FA_Yux3Jl2D-7Q:1669850991596&ei=b-eHY4-DJOz31sQPuMKgyAU&start=240&sa=N&ved=0ahUKEwjP9rnZh9f7AhXsu5UCHTghCFk4tAEQ8tMDCI4U&biw=1366&bih=664&dpr=1'

headers = {'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"}

site = requests.get(url_jeans, headers=headers)
soup = BeautifulSoup(site.content, "html.parser")

calcas = soup.find_all('div', class_ = re.compile('sh-dgr__content'))

dic_produtos = {'Marca':[], 'Preço':[]}

print('| ----- ROUPAS JEANS ----- |')

for calca in calcas:
        
    marca = calca.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = calca.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for calca in calcas:
    
    site = requests.get(url2_jeans, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = calca.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = calca.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for calca in calcas:
    
    site = requests.get(url3_jeans, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = calca.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = calca.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for calca in calcas:
    
    site = requests.get(url4_jeans, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = calca.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = calca.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for calca in calcas:
    
    site = requests.get(url5_jeans, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = calca.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = calca.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

df = pd.DataFrame(dic_produtos)
#df.to_csv('C:\\Users\\Aluno\\Documents\\WebCrawller-Scraping\\precos_jeans.csv', encoding='utf-8', sep=';')
#df.to_csv('/home/ubuntu/WebCrawller-Scraping/precos_jeans.csv', encoding='utf-8', sep=';')
#df.to_csv('/home/wilker/Documentos/WebCrawller-Scraping/precos_jeans.csv', encoding='utf-8', sep=';')

#tabela = df.to_html('C:\\Users\\Aluno\\Documents\\WebCrawller-Scraping\\tabela_jeans.html', encoding='utf-8')
#tabela = df.to_html('/home/ubuntu/WebCrawller-Scraping/tabela_jeans.html', encoding='utf-8')
#tabela = df.to_html('/home/wilker/Documentos/WebCrawller-Scraping/tabela_jeans.html', encoding='utf-8')