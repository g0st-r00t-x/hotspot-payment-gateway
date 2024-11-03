// app/api/createVoucher/route.js
import { NextResponse } from 'next/server';
import net from 'net';

// Fungsi untuk membentuk pesan API MikroTik
function encodeMikrotikMessage(message) {
  const length = message.length;
  let encodedLength = Buffer.alloc(1);

  if (length < 0x80) {
    encodedLength[0] = length;
  } else if (length < 0x4000) {
    encodedLength = Buffer.alloc(2);
    encodedLength[0] = (length >> 8) | 0x80;
    encodedLength[1] = length & 0xFF;
  } else if (length < 0x200000) {
    encodedLength = Buffer.alloc(3);
    encodedLength[0] = (length >> 16) | 0xC0;
    encodedLength[1] = (length >> 8) & 0xFF;
    encodedLength[2] = length & 0xFF;
  } else {
    encodedLength = Buffer.alloc(4);
    encodedLength[0] = (length >> 24) | 0xE0;
    encodedLength[1] = (length >> 16) & 0xFF;
    encodedLength[2] = (length >> 8) & 0xFF;
    encodedLength[3] = length & 0xFF;
  }

  return Buffer.concat([encodedLength, Buffer.from(message)]);
}

export async function POST(request) {
  const client = new net.Socket();
  const messages = [
    encodeMikrotikMessage('/login'),
    encodeMikrotikMessage('=name=admin'), // Ganti dengan username Anda
    encodeMikrotikMessage('=password=password'), // Ganti dengan password Anda
  ];

  return new Promise((resolve) => {
    client.connect(8728, '192.168.88.1', () => {
      // Kirim perintah ke MikroTik untuk login
      messages.forEach((msg) => client.write(msg));
      client.write(Buffer.from([0]));

      // Kirim perintah untuk membuat voucher setelah login
      client.on('data', (data) => {
        if (data.includes('!done')) {
          const addVoucherMessages = [
            encodeMikrotikMessage('/ip/hotspot/user/add'),
            encodeMikrotikMessage('=name=new_voucher'), // Ganti sesuai nama voucher
            encodeMikrotikMessage('=password=12345'), // Ganti sesuai password voucher
          ];
          addVoucherMessages.forEach((msg) => client.write(msg));
          client.write(Buffer.from([0]));

          resolve(NextResponse.json({ success: true, message: 'Voucher created successfully' }));
          client.end();
        }
      });
    });

    client.on('error', (err) => {
      console.error('Error:', err);
      resolve(NextResponse.json({ success: false, error: err.message }));
    });
  });
}
