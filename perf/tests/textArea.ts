import path from 'path'
import {config} from '../config'
import {sleep, test} from '../lib'

test('TextArea: typing', async (page, measure) => {
  await page.goto(`${config.baseUrl}/text-area`)

  const input = await page.waitForSelector('[data-test="text-area"]')

  if (!input) {
    throw new Error('Could not find input')
  }

  // Clear the input
  await input.evaluate((el: any) => {
    el.value = ''
  })

  await sleep(50)

  // Type characters from a-z
  await measure('Type characters from a-z', async () => {
    await input.type('abcdefghijklmnopqrstuvwxyz')
  })

  await page.screenshot({
    path: path.resolve(config.artifacts.path, 'textArea_typingSpeed.png'),
  })
})