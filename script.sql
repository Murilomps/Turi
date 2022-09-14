CREATE DATABASE Turing;
USE Turing;


CREATE TABLE empresa (
	
    id int primary key auto_increment,
	nome VARCHAR(45) NOT NULL,
    cnpj CHAR(18) NOT NULL,
    codigo_cadastro VARCHAR(45) NOT NULL,
    rua VARCHAR(45) NOT NULL,
    bairro VARCHAR(45) NOT NULL,
    numero INT NOT NULL

);

INSERT INTO empresa VALUES(null, "Riachuelo", "00.038.166/0002-88", "241eadww123aw", "Rua Delurdes", "Vila Sônia", 0);



CREATE TABLE usuario (
	
    id INT PRIMARY KEY AUTO_INCREMENT,
	fk_empresa INT NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
    nome VARCHAR(45) NOT NULL,
    sobrenome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    tipo_usuario INT NOT NULL

)AUTO_INCREMENT=100;

CREATE TABLE computador (
	
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_empresa INT NOT NULL,
    FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
    sistema_operacional VARCHAR(45) NOT NULL,
    disco_total FLOAT NOT NULL,
	cpu_nucleos_logicos INT NOT NULL,
    cpu_nucleos_fisicos INT NOT NULL,
	cpu_freq_maxima FLOAT NOT NULL,
    memoria_total FLOAT NOT NULL,
    swap_total FLOAT NOT NULL
	
)AUTO_INCREMENT=200;

CREATE TABLE disco_dinamico (

	id INT PRIMARY KEY AUTO_INCREMENT,
    fk_computador INT NOT NULL,
    FOREIGN KEY (fk_computador) REFERENCES computador(id),
    total float,
    usado float,
    porcentagem_usado float,
    livre float

)AUTO_INCREMENT=300;

CREATE TABLE cpu_dinamica (

	id INT PRIMARY KEY AUTO_INCREMENT,
    fk_computador INT NOT NULL,
    FOREIGN KEY (fk_computador) REFERENCES computador(id),
	usuario FLOAT,
    sistema FLOAT,
    ociosa FLOAT,
    procedimentos_adiados FLOAT,
    frequencia FLOAT

) AUTO_INCREMENT=500;

CREATE TABLE memoria_dinamica (
	
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_computador INT NOT NULL,
    FOREIGN KEY (fk_computador) REFERENCES computador(id), 
    total float,
    usada float,
    porcentagem_usada float,
    livre float,
    ativa float,
    inativa float,
    buffer float,
    compartilhada float

)AUTO_INCREMENT=201;

CREATE TABLE swap_dinamica (
	
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_computador INT NOT NULL,
    FOREIGN KEY (fk_computador) REFERENCES computador(id),
    total float,
    usada float,
    porcentagem_usada float,
    livre float

)AUTO_INCREMENT=301;    
