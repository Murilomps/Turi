import time;

from prettytable import PrettyTable;
import sys;
sys.path.append('..');
from model.Hardware import Hardware;
from model.Cpu import Cpu;
from model.Memoria import Memoria;
from model.Disco import Disco
from view.HardwareView import HardwareView;
from database.config import *;

from dao.CpuDao import CpuDao;
from dao.DiscoDao import DiscoDao;
from dao.MemoriaDao import MemoriaDao;

class HardwareController:  


    quanto_tempo = 0;
    intervalo_tempo = 0;
    enviar_banco = False;

    def __init__(self, model, view, database, dao):
        self.model = model;
        self.view = view;
        self.database = database;
        self.dao = dao;

    @staticmethod
    def pergunta_quanto_tempo():
        print("\n\nQuanto tempo (segundos):");
        return int(input("Resposta: "));

    @staticmethod
    def perguntar_intervalo_tempo():
        print("\n\nQuer exibir as informações de quanto em quanto tempo?: ");
        return int(input("Resposta: "));

    @staticmethod
    def pergunta_enviar_banco():
        print("\n\nDeseja enviar para o banco? S/n");
        resposta_usuario = input("Resposta: ").lower();
        
        if resposta_usuario != 's' and resposta_usuario != 'n':
            raise Exception;
        
        if resposta_usuario == 's':
            return True;
        
        else:
            return False;
        
    
    @classmethod
    def perguntar_usuario(cls):

        quanto_tempo = HardwareController.pergunta_quanto_tempo();
        cls.quanto_tempo = quanto_tempo;
            
        intervalo_tempo = HardwareController.perguntar_intervalo_tempo();
        cls.intervalo_tempo = intervalo_tempo


        enviar_banco = HardwareController.pergunta_enviar_banco();
        cls.enviar_banco = enviar_banco;
    
    def executar_programa(self):
        tempo_segundos = 0;

        conn = self.database.realizar_conexao_banco();
        
        try:
            with conn.cursor() as cursor:
                while(tempo_segundos < self.quanto_tempo):
                    
                    print(f"\n{tempo_segundos + 1})")
                    data = self.model.obter_dados();
                    self.view.exibir_dados_hardware(data);
                    tempo_segundos += self.intervalo_tempo;
                    
                    if(self.enviar_banco):
                        
                        for d in data:
                    
                            self.dao[0].inserir_media_cpu(cursor, d);
                            self.dao[1].inserir_dados_disco(cursor, d);
                            self.dao[2].inserir_dados_memoria(cursor, d);
                            self.dao[2].inserir_dados_swap(cursor, d);

                    conn.commit();
                    time.sleep(self.intervalo_tempo);
            
            conn.close();
        
        except:
            print("Houve um erro ao inserir os dados no banco");


        
    def iniciar(self):

        try:
            self.perguntar_usuario();
            self.executar_programa();

        except:
            print("Resposta inválida");