import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          {/* Outras tags do Head */}
          <title>QUERO ENGAJAR - Comentários Reais no Instagram em Segundos</title>
          <meta name="description" content="Aumente o engajamento no Instagram com comentários reais e automáticos. Receba interações em segundos com a ferramenta QUERO ENGAJAR." />
          <meta name="keywords" content="comentários reais Instagram, engajamento automático, aumentar alcance Instagram, Quero Engajar, ferramenta de engajamento, comentários automáticos, aumentar seguidores Instagram, marketing digital Instagram, interação Instagram" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" type="image/png" href="/icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
