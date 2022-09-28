import sys;
sys.path.append('..');
from helper.Conversao import Conversao;
import psutil;


class Memoria:

    def __init__(self):
        self.memoria_total = Conversao.byte_gb(psutil.virtual_memory().total);
        self.swap_total = Conversao.byte_gb(psutil.swap_memory().total);

    def buscar_informacoes_memoria(self):
        return {
            "memoria_total" : self.memoria_total,
            "swap_total" : self.swap_total
        }
    
    def buscar_dados_memoria(self):
        memoria = psutil.virtual_memory();
        return {
            "memoria_total" : self.memoria_total,
            "memoria_usada" : Conversao.byte_gb(memoria.used),
            "porcentagem_memoria_usada": memoria.percent,
            "memoria_livre" : Conversao.byte_gb(memoria.free),
            "memoria_ativa" : Conversao.byte_gb(memoria.active),
            "memoria_inativa" : Conversao.byte_gb(memoria.active),
            "memoria_buffer" : Conversao.byte_gb(memoria.buffers),
            "memoria_compartilhada" : Conversao.byte_gb(memoria.buffers)
        }

    def buscar_dados_swap(self):
        swap = psutil.swap_memory();
        return {
            "swap_total" : self.memoria_total,
            "swap_usada" : Conversao.byte_gb(swap.used),
            "porcentagem_swap_usada" : swap.percent,
            "swap_livre" : Conversao.byte_gb(swap.free),
        }

    def buscar_todos_dados(self):
        memoria = psutil.virtual_memory();
        swap = psutil.swap_memory();

        return {
            "memoria_total" : self.memoria_total,
            "memoria_usada" : Conversao.byte_gb(memoria.used),
            "porcentagem_memoria_usada": memoria.percent,
            "memoria_livre" : Conversao.byte_gb(memoria.free),
            "memoria_ativa" : Conversao.byte_gb(memoria.active),
            "memoria_inativa" : Conversao.byte_gb(memoria.active),
            "memoria_buffer" : Conversao.byte_gb(memoria.buffers),
            "memoria_compartilhada" : Conversao.byte_gb(memoria.buffers),
            "swap_total" : self.memoria_total,
            "swap_usada" : Conversao.byte_gb(swap.used),
            "porcentagem_swap_usada" : swap.percent,
            "swap_livre" : Conversao.byte_gb(swap.free),
        }
