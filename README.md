# LZW - Lempel-Ziv-Welch Compression

A simplified, JavaScript-based implementation of the famous compression algorithm for illustrative purposes.

[See it in action](https://mdumke.github.io/lzw-viz)

LZW is at the heart of zip, png, and many other compression formats. It creates variable-length codes without knowing a probability distribution over symbols beforehand. LZW adapts to the respective data to encode (compress) and manages to be efficient and general purpose at the same time.

A detailed explanation can be found in Mark Nelson's blog posts from [1989](https://marknelson.us/posts/1989/10/01/lzw-data-compression.html) and [2011](https://marknelson.us/posts/2011/11/08/lzw-revisited.html). For more background on the topic of source coding in general, check out MIT's [Digital Communication Systems](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-02-introduction-to-eecs-ii-digital-communication-systems-fall-2012/index.htm)

