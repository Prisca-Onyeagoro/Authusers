import jwt from 'jsonwebtoken';

export function getDataFromToken(request) {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decodedData = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedData.id;
  } catch (error) {
    throw new Error(error.message);
  }
}
