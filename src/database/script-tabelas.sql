/* Microsoft SQL Server */
CREATE TABLE empresa (	
	id INT PRIMARY KEY IDENTITY,
	nome VARCHAR(45) NOT NULL,
	cnpj CHAR(18) NOT NULL,
	codigo_cadastro VARCHAR(45),
	rua VARCHAR(60),
	bairro VARCHAR(50),
	numero INT,
	senha VARCHAR(50) NOT NULL
);

INSERT INTO empresa VALUES(null, "Riachuelo", "00.038.166/0002-88", "241eadww123aw", "Rua Delurdes", "Vila Sônia", 0);

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY,
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	senha VARCHAR(100) NOT NULL,
	tipo_usuario INT
);

CREATE TABLE computador (
	id INT PRIMARY KEY IDENTITY,
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa (id),
	sistema_operacional VARCHAR(50),
	memoria_total FLOAT NOT NULL,
	disco_total FLOAT NOT NULL,
	cpu_nucleos_fisicos INT NOT NULL,
	cpu_nucleos_logicos INT NOT NULL
);

CREATE TABLE leitura (
	id INT PRIMARY KEY IDENTITY,
	fk_computador INT NOT NULL,
	FOREIGN KEY (fk_computador) REFERENCES computador(id),
	cpu_porcentagem FLOAT,
	cpu_idle FLOAT,
	memoria_usada FLOAT,
	memoria_disponivel FLOAT,
	memoria_livre FLOAT,
	memoria_ativa FLOAT,
	memoria_inativa FLOAT,
	memoria_buffer FLOAT,
	memoria_cache FLOAT,
	disco_usado FLOAT
);

/* MYSQL */
CREATE DATABASE Turi;
USE Turi;

CREATE TABLE empresa (	
    id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45) NOT NULL,
    cnpj CHAR(18) NOT NULL,
	codigo_cadastro VARCHAR(45),
    rua VARCHAR(60),
    bairro VARCHAR(50),
    numero INT
	senha VARCHAR(50) NOT NULL
);

INSERT INTO empresa VALUES(null, "Riachuelo", "00.038.166/0002-88", "241eadww123aw", "Rua Delurdes", "Vila Sônia", 0);

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
	fk_empresa INT,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    tipo_usuario INT
)AUTO_INCREMENT=100;

CREATE TABLE computador (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa (id),
	sistema_operacional VARCHAR(50),
	memoria_total FLOAT NOT NULL,
	disco_total FLOAT NOT NULL,
	cpu_nucleos_fisicos INT NOT NULL,
	cpu_nucleos_logicos INT NOT NULL
)  AUTO_INCREMENT=200;

CREATE TABLE leitura (
	id INT PRIMARY KEY AUTO_INCREMENT,
    fk_computador INT NOT NULL,
    FOREIGN KEY (fk_computador) REFERENCES computador(id),
    cpu_porcentagem FLOAT,
    cpu_idle FLOAT,
    memoria_usada FLOAT,
    memoria_disponivel FLOAT,
    memoria_livre FLOAT,
    memoria_ativa FLOAT,
    memoria_inativa FLOAT,
    memoria_buffer FLOAT,
    memoria_cache FLOAT,
    disco_usado FLOAT
);