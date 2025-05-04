## Digital Certificates

Used to verify the server's ownership prior to sending encrypted data. 

Just like a physical certificate you might sign (e.g. car registration), the digital signature of this digital certificate is valid and we trust the person who issued this TLS certificate, then we say, ok, I'm willing to use th ekey that this server sent to send encrypted data back and forth with that server. This is used to verify that we're actually talking to the server that we expect. I mean what difference does it make if we're sending encrypted data if it's going to the wrong person!! The secret is out lol.  This is known as a 'man in the middle' attack if that happens. 

## Certificate Authority aka CA

A trusted organization that issues digital certificates.

This is an organization that your computer or your browser already trusts to issue a valid digital certificates that actually verify the real server's owner and aren't just created by some malicious hacker. 

In the early days we had to buy these certificates from 'Certificate Authorities' that would potentially cost 100s of dollars. But lucky for us, there's now certificate authorites that allow us to sign these certificates for free! 

One of the most well known CA's is 'Let's Encrypt' which are backed by Google, Facebook and all kinds of other giant companies to provide you with the same security w/out the added cost. However, Let's Encrypt will only give you a certificate if you meet certain conditions. For example, your site needs to have a domain name and can't just be an IP address on some server somewhere. This is why we have a type of certificate called a 'self signed certificate' that still allow sus to encrypt our traffic and use HTTPS, but we sign it ourselves on our local machine and our local machine our cert is not trusted by others. It's used for development 