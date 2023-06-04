import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* 添加Google Analytics代码和事件跟踪代码 */}
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                <!-- Google Analytics -->
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-43HNXJP55G');
                
                <!-- Event Tracking -->
                function trackCardEvent(url) {
                  gtag('event', 'lick', { 
                    'event_name':'cardClick'
                    'event_category': 'Card Click',
                    'event_label': url 
                  });
                }
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
