import type { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import { S3 } from '../../lib/aws';
import { IMAGE_EXTENSTIONS } from '../../helpers/file';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;

    //extensao é usada pra formular o nome do arquivo no bucket
    //uuid + ext
    const extension = req.query["ext"]
    if (!extension) {
        return res.status(401).json({ error: "Non-existent extension" });
    }

    if (Array.isArray(extension)) {
        return res.status(404).json({ error: "Multiple extensions aren't allowed" });
    }

    //https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
    const allowed_extensions = [...IMAGE_EXTENSTIONS]

    //só aceitamos extensoes de midias :^)
    if (!allowed_extensions.some(allowed => extension == extension)) {
        return res.status(404).json({ error: "Requested extension isn't allowed" });
    }

    switch (method) {
        case "GET":
            try {
                const post = await S3.createPresignedPost({
                    Bucket: process.env.AWS_BUCKET,
                    Fields: {
                        key: `uploads/${randomUUID()}.${extension}`,
                        acl: "public-read"
                    },
                    Expires: 60 * 3, // segundos, 3 minutos, deve ser o suficiente pra fazer upload
                    Conditions: [
                        ["content-length-range", 0, 10485760], // maximo é 10mb
                        ["starts-with", "$Content-Type", "image/"], // content type precisa começar com "image"
                    ]
                });
                
                res.status(200).json({ post });
            } catch (e) {
                console.error("Request error", e);
                res.status(500).json({ error: "Error creating presigned post" });
            }
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} is not allowed`);
            break;
    }
}