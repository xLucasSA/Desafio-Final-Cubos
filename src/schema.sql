create table usuarios (
	id serial primary key,
  nome text not null,
  email text unique,
  senha text not null
);

create table categorias (
	id serial primary key,
  descricao text not null
);


insert into categorias (descricao) 
values 
('Informática'),
('Celulares'),
('Beleza e Perfumaria'),
('Mercado'),
('Livros e Papelaria'),
('Brinquedos'),
('Moda'),
('Bebê'),
('Games');

create table produtos (
	id serial primary key,
  descricao text not null,
  quantidade_estoque int not null,
  valor int not null,
  categoria_id int references categorias(id)
  produto_imagem text
);

create table clientes (
	id serial primary key,
  nome text not null,
  email text unique not null,
  cpf char(11) unique not null,
  cep char(8),
  rua text,
  numero int,
  bairro text,
  cidade text,
  estado char(2)
);

alter table produtos alter column categoria_id
set not null;

create table pedidos (
  id serial primary key,
  cliente_id  int references cliente(id),
  observacao text,
  valor_total int -- referencia da soma de todos os valores?
  
);
create table pedido_produtos (
	id serial primary key,
  pedido_id int references cliente_id(pedidos) not null,
  produto_id int references produtos(id) not null,
  quantidade_produto int not null,
  valor_produto int not null
);

alter table produtos add column produto_imagem text;