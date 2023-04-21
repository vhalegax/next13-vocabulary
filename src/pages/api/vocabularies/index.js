// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { google } from 'googleapis'

const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } = process.env
const SHEET_RANGE = `Sheet1!A:F`

const getGoogleClient = () => {
  const keys = {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY
  }

  return new google.auth.JWT(keys.client_email, null, keys.private_key, [
    'https://www.googleapis.com/auth/spreadsheets'
  ])
}

const getVocabularies = async (req, res) => {
  try {
    const googleClient = getGoogleClient()

    googleClient.authorize(async function (err, tokens) {
      if (err) {
        return res.status(400).send(JSON.stringify({ error: true }))
      }

      const gsapi = google.sheets({ version: 'v4', auth: googleClient })

      //CUSTOMIZATION FROM HERE
      const opt = {
        spreadsheetId: GOOGLE_SHEET_ID,
        range: SHEET_RANGE
      }

      let data = await gsapi.spreadsheets.values.get(opt)

      return res.status(200).send(JSON.stringify({ data: data.data.values }))
    })
  } catch (e) {
    const error = { code: 400, message: e.message }
    return res.status(400).send(JSON.stringify({ error }))
  }
}
export default async function handler(req, res) {
  if (req.method === 'GET') {
    await getVocabularies(req, res)
  } 
}
