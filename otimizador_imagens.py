import os

from PIL import Image

IMAGENS_GALERIA = [
    "campo-levantamento-01.png",
    "IMG_20250320_141213884.jpg",
    "trabalhos-03-obras.jpeg",
    "IMG_20250516_155640436.jpg",
    "PXL_20250818_115339415.jpg",
    "campo-atendimento.jpeg",
]

LARGURA_MAXIMA = 800
QUALIDADE_WEBP = 80


def nome_thumbnail(arquivo_original):
    nome_base, _ = os.path.splitext(arquivo_original)
    return f"{nome_base}-thumb.webp"


def otimizar_imagens():
    raiz_projeto = os.path.dirname(os.path.abspath(__file__))
    pasta_galeria = os.path.join(raiz_projeto, "galeria")
    os.makedirs(pasta_galeria, exist_ok=True)

    for arquivo in IMAGENS_GALERIA:
        caminho_entrada = os.path.join(pasta_galeria, arquivo)

        if not os.path.isfile(caminho_entrada):
            print(f"Erro: arquivo não encontrado -> {caminho_entrada}")
            continue

        caminho_saida = os.path.join(pasta_galeria, nome_thumbnail(arquivo))

        with Image.open(caminho_entrada) as imagem:
            imagem = imagem.convert("RGB")
            largura, altura = imagem.size

            if largura > LARGURA_MAXIMA:
                nova_altura = round(altura * (LARGURA_MAXIMA / largura))
                imagem = imagem.resize((LARGURA_MAXIMA, nova_altura), Image.Resampling.LANCZOS)

            imagem.save(
                caminho_saida,
                format="WEBP",
                quality=QUALIDADE_WEBP,
                method=6,
            )

        tamanho_original_kb = os.path.getsize(caminho_entrada) / 1024
        tamanho_novo_kb = os.path.getsize(caminho_saida) / 1024
        print(
            f"Gerado: {nome_thumbnail(arquivo)} "
            f"({tamanho_original_kb:.1f} KB -> {tamanho_novo_kb:.1f} KB)"
        )


if __name__ == "__main__":
    otimizar_imagens()
