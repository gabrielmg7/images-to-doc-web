
# Image to DOCX Generator | Frontend

Este projeto é um frontend em React, utilizando Vite, TypeScript e Material UI, que permite o upload de múltiplas imagens e a geração de um documento .docx contendo essas imagens, com legendas baseadas no nome dos arquivos.

## Requisitos

- Node.js (versão 12 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/gabrielmg7/image-doc-frontend.git
    cd image-doc-frontend
    ```

2. Instale as dependências necessárias:

    ```bash
    npm install
    ```

## Uso

1. Inicie o servidor de desenvolvimento do Vite:

    ```bash
    npm run dev
    ```

2. O frontend estará acessível em `http://localhost:5173`.

3. Acesse a aplicação no seu navegador, selecione múltiplas imagens e clique em "Generate DOCX" para enviar as imagens ao backend e gerar o documento .docx.

## Estrutura do Projeto

- `src/App.tsx`: Componente principal contendo o formulário de upload e a lógica de comunicação com o backend.
- `src/main.tsx`: Ponto de entrada do aplicativo React.
- `src/vite-env.d.ts`: Definições de tipo para o Vite.
- `vite.config.ts`: Configuração do Vite para o projeto.

## Dependências

- [React](https://reactjs.org/): Biblioteca para construção de interfaces de usuário.
- [Vite](https://vitejs.dev/): Ferramenta de build rápida e configurável para projetos modernos de front-end.
- [TypeScript](https://www.typescriptlang.org/): Superconjunto tipado do JavaScript que compila para JavaScript puro.
- [Material UI](https://mui.com/): Biblioteca de componentes de UI para React.
- [Axios](https://axios-http.com/): Cliente HTTP baseado em promessas para o navegador e Node.js.

## Comunicação com o Backend

- O frontend faz uma requisição POST para `http://localhost:3001/generate-doc` com os arquivos de imagem selecionados.
- O backend recebe os arquivos, gera o documento .docx e o envia de volta como um arquivo para download.

## Exemplo de Requisição

Aqui está um exemplo de como o frontend envia uma requisição ao backend:

```tsx
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFiles) return;

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
        formData.append('images', file);
    });

    setLoading(true);

    try {
        const response = await axios.post('http://localhost:3001/generate-doc', formData, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'output.docx');
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error('Error generating document', error);
    } finally {
        setLoading(false);
    }
};
```

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, faça um fork deste repositório, crie uma branch para suas alterações e abra um pull request.
