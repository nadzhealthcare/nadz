# Book Doctor / Contact form – email not sending

## What is causing the issue

The error in logs is:

```text
[book-doctor] Background email failed: ETIMEDOUT
code: 'ETIMEDOUT'
command: 'CONN'
```

That means: **the server where your app runs cannot open a TCP connection to Gmail’s SMTP server** (`smtp.gmail.com` on port 587 or 465). The connection times out before it is established.

So the problem is **not**:
- Cloudflare
- Your .env (SMTP_USER, SMTP_PASSWORD, etc.)
- The form or the API code

The problem **is**:
- **Outbound SMTP is blocked or restricted** on the host/network where the app runs (firewall, security group, or ISP blocking port 587/465).

## How to verify

Run these **on the same server** where Next.js/PM2 runs (SSH into the host, then):

### 1. Test if the server can reach Gmail SMTP (port 587)

```bash
timeout 5 bash -c 'cat < /dev/null > /dev/tcp/smtp.gmail.com/587' 2>&1 && echo "Port 587: OK" || echo "Port 587: FAILED (timeout or refused)"
```

If you see **Port 587: FAILED**, the server cannot connect to Gmail on 587.

### 2. Same for port 465 (SMTPS)

```bash
timeout 5 bash -c 'cat < /dev/null > /dev/tcp/smtp.gmail.com/465' 2>&1 && echo "Port 465: OK" || echo "Port 465: FAILED"
```

If both 587 and 465 fail, outbound SMTP from that server is blocked.

### 3. Alternative: use `nc` (netcat) if installed

```bash
nc -zv -w 5 smtp.gmail.com 587
nc -zv -w 5 smtp.gmail.com 465
```

`Connection refused` or timeout = cannot reach Gmail SMTP from that host.

## What you can do (without changing to another provider)

1. **Ask the host/network admin** to allow **outbound** TCP to:
   - `smtp.gmail.com:587`
   - and/or `smtp.gmail.com:465`
2. **If you manage the server** (e.g. your own VPS): open outbound 587 and 465 in the firewall/security group.
3. **Try port 465** in `.env`: set `SMTP_PORT=465` and restart the app. Some networks allow 465 but block 587.

If the host will not open SMTP ports, the only way to send email from that server is to use an **email API over HTTPS** (e.g. Resend, SendGrid, Mailgun), which uses port 443 like normal web traffic.
