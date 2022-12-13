import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import math

url_regatas = 'https://www.google.com/search?q=regata+feminina&sa=X&biw=1365&bih=663&tbm=shop&sxsrf=ALiCzsZtuKTmUPI7_6uJcsPZCmIUZGt2ag%3A1669933587987&ei=EyqJY_2kO-3Q1sQP8uaqyAs&oq=regata&gs_lcp=Cgtwcm9kdWN0cy1jYxABGAEyDQgAELEDEIMBELADEEMyDQgAELEDEIMBELADEEMyDQgAELEDEIMBELADEEMyDQgAELEDEIMBELADEEMyDQgAELEDEIMBELADEEMyDggAEIAEELEDEIMBELADMg4IABCABBCxAxCDARCwAzIOCAAQgAQQsQMQgwEQsAMyDggAEIAEELEDEIMBELADMg4IABCABBCxAxCDARCwA0oECEEYAVAAWABg2y9oAXAAeACAAQCIAQCSAQCYAQDIAQrAAQE&sclient=products-cc'
url2_regatas= 'https://www.google.com/search?q=regata+feminina&tbs=vw:g&tbm=shop&sxsrf=ALiCzsbN2HFI4c-23N0B0OadqS3oLUzlsw:1669933603233&ei=IyqJY5W0DfrW1sQPz7SF-AE&start=60&sa=N&ved=0ahUKEwjV0d-5u9n7AhV6q5UCHU9aAR8Q8tMDCOkU&biw=1365&bih=663&dpr=1'
url3_regatas = 'https://www.google.com/search?q=regata+feminina&tbs=vw:g&tbm=shop&sxsrf=ALiCzsZasREOk9IIUIF6ZEBzEW6-4u704w:1669933650727&ei=UiqJY7CCLLfN1sQPuper-Ag&start=120&sa=N&ved=0ahUKEwiw87LQu9n7AhW3ppUCHbrLCo84PBDy0wMIpxQ&biw=1365&bih=663&dpr=1'
url4_regatas = 'https://www.google.com/search?q=regata+feminina&tbs=vw:g&tbm=shop&sxsrf=ALiCzsbNTtOnJAZeMxBoF8aciwctgm7BVg:1669933672580&ei=aCqJY7qCI6fW1sQP7JWX8A0&start=180&sa=N&ved=0ahUKEwi61ujau9n7AhUnq5UCHezKBd44eBDy0wMI-xM&biw=1365&bih=663&dpr=1'
url5_regatas = 'https://www.google.com/search?q=regata+feminina&tbs=vw:g&tbm=shop&sxsrf=ALiCzsaPsi2fpFyuFmf_NfKJfzv8vFN4Nw:1669933690351&ei=eiqJY-mIFeSo1sQPrten0Aw&start=240&sa=N&ved=0ahUKEwjpraXju9n7AhVklJUCHa7rCco4tAEQ8tMDCN0T&biw=1365&bih=663&dpr=1'

headers = {'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"}

site = requests.get(url_regatas, headers=headers)
soup = BeautifulSoup(site.content, "html.parser")

regatas = soup.find_all('div', class_ = re.compile('sh-dgr__content'))

dic_produtos = {'Marca':[], 'Preço':[]}

print('| ----- REGATAS ----- |')

for regata in regatas:
        
    marca = regata.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = regata.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for regata in regatas:
    
    site = requests.get(url2_regatas, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = regata.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = regata.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for regata in regatas:
    
    site = requests.get(url3_regatas, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = regata.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = regata.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for regata in regatas:
    
    site = requests.get(url4_regatas, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = regata.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = regata.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

for regata in regatas:
    
    site = requests.get(url5_regatas, headers=headers)
    soup = BeautifulSoup(site.content, "html.parser")

    marca = regata.find('div', class_ = re.compile('aULzUe IuHnof')).get_text().strip()
    preco = regata.find('span', class_ = re.compile('a8Pemb OFFNJ')).get_text().strip()

    print(marca, preco)

    dic_produtos['Marca'].append(marca)
    dic_produtos['Preço'].append(preco)

df = pd.DataFrame(dic_produtos)
#df.to_csv('C:\\Users\\Aluno\\Documentos\\WebCrawller-Scraping\\precos_regatas.csv', encoding='utf-8', sep=';')
#df.to_csv('/home/ubuntu/WebCrawller-Scraping/precos_regatas.csv', encoding='utf-8', sep=';')
#df.to_csv('/home/wilker/Documentos/WebCrawller-Scraping/precos_regatas.csv', encoding='utf-8', sep=';')

#tabela = df.to_html('C:\\Users\\Aluno\\Documents\\WebCrawller-Scraping\\tabela_regatas.html', encoding='utf-8')
#tabela = df.to_html('/home/ubuntu/WebCrawller-Scraping/tabela_regatas.html', encoding='utf-8')
#tabela = df.to_html('/home/wilker/Documentos/WebCrawller-Scraping/tabela_regatas.html', encoding='utf-8')