import sys;
sys.path.append('..');
from helper.Conversao import Conversao;
import psutil;

class Disco:    
    
    def __init__(self):        
        self.total = Conversao.byte_gb(psutil.disk_usage('/').total);
        
    def buscar_capacidade_total(self):
        return self.total;

    def buscar_dados_disco(self):
        disco = psutil.disk_usage('/');
        return {
            "total" : self.total,
            "usado" : Conversao.byte_gb(disco.used),
            "porcentagem_disco_usado" : disco.percent,
            "livre" : Conversao.byte_gb(disco.free)
        }
