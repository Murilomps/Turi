import psutil;

class Cpu:

    def __init__(self):
        self.nucleos_logicos = psutil.cpu_count();
        self.nucleos_fisicos = psutil.cpu_count(False);
        self._freq_maxima = psutil.cpu_freq().max;
    
    def buscar_informacoes(self):
        return {
            "nucleos_logicos" : self.nucleos_logicos,
            "nucleos_fisicos" : self.nucleos_fisicos,
            "freq_maxima" : self._freq_maxima
        }

    @staticmethod
    def buscar_dados_media():
        dados_cpu_tempo = psutil.cpu_times(percpu=False);
        dados_cpu_frequencia = psutil.cpu_freq();
        
        json_dados = {
            "user" : dados_cpu_tempo.user, 
            "system" : dados_cpu_tempo.system, 
            "idle" : dados_cpu_tempo.idle, 
            "iowait" : dados_cpu_tempo.iowait, 
            "freq" : round(dados_cpu_frequencia.current,2)
        }

        return json_dados;

    @staticmethod
    def buscar_dados_nucleos():
        dados_cpu_tempo = psutil.cpu_times(percpu=True);
        dados_cpu_frequencia = psutil.cpu_freq(percpu=True);
        dados_cpu = []
        
        for i in range(len(dados_cpu_tempo)):
            
            json_dados = {
                "user" : dados_cpu_tempo[i].user,
                "system" : dados_cpu_tempo[i].system,
                "idle" : dados_cpu_tempo[i].idle,
                "iowait" : dados_cpu_tempo[i].iowait,
                "freq" : dados_cpu_frequencia[i].current
            }

            dados_cpu.append(json_dados);

        return dados_cpu;
