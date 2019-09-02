import { validateAddItems } from '../src/lib/input-validation'

describe('input validation', () => {
  describe('validateAddItems', () => {
    let validInput

    beforeEach(() => {
      validInput = {
        items: [{
          id: '01120000',
          title: 'alligator handbag',
          url: '/products/handbag',
          description: 'A handbag made out of real alligator skin, you classy devil',
          imgUrl: 'https://myshop.com/products/handbag.jpg',
          otherImages: ['https://myshop.com/products/handbag-1.jpg','https://myshop.com/products/handbag-2.jpg'],
          keywords: ['handbag','animalskins','trashy'],
          price: '99.00'
        }, {
          id: '01120001',
          title: 'slingshot',
          url: '/products/slingshot',
          description: 'A slingshot made out of medical tubing.',
          imgUrl: 'https://myshop.com/products/slingshot.jpg',
          otherImages: ['https://myshop.com/products/slingshot-1.jpg','https://myshop.com/products/slingshot-2.jpg'],
          keywords: ['slingshot','vandalism','whyareyoubuyingthesetogether'],
          quantity: 2,
          price: '34.00',
        }]
      }
    })

    it('throws when input is invalid', () => {
      const invalidInput = 'arglebargle'
      try {
        validateAddItems(invalidInput)
      } catch (err) {
        expect(err.message).toBe('Input error: expected string to be object')
      }
    })

    it('throws items are invalid', () => {
      const invalidInput = {
        items: [{
          id: 4343534543,
          title: 'read the docs. Id should be a string',
          url: '/products/slingshot',
          description: 'A slingshot made out of medical tubing.',
          imgUrl: 'https://myshop.com/products/slingshot.jpg',
          otherImages: ['https://myshop.com/products/slingshot-1.jpg','https://myshop.com/products/slingshot-2.jpg'],
          keywords: ['slingshot','vandalism','whyareyoubuyingthesetogether'],
          quantity: 2,
          price: '34.00',
        }]
      }

      try {
        validateAddItems(invalidInput)
      } catch (err) {
        expect(err.message).toBe('Input error: expected number to be string')
      }
    })

    it('throws when required item keys are missing', () => {
      const invalidInput = {
        items: [{
          title: 'idontknowwhatthisis',
          url: '/products/idontknowwhatthisis',
          description: 'How do you expect us to track a product with no id?',
          imgUrl: 'https://myshop.com/products/idontknowwhatthisis.jpg',
          otherImages: ['https://myshop.com/products/idontknowwhatthisis-1.jpg','https://myshop.com/products/idontknowwhatthisis.jpg'],
          keywords: ['mystery','unknown'],
          quantity: 2,
          price: '00.01',
        }]
      }

      try {
        validateAddItems(invalidInput)
      } catch (err) {
        expect(err.message).toBe('Input error: expected undefined to be string')
      }
    })

    it('throws when optional fields are invalid', () => {
      const invalidInput = {
        items: [{
          id: '01120001',
          title: 'Why on earth would keywords be a number?',
          url: '/products/slingshot',
          description: 'A slingshot made out of medical tubing.',
          imgUrl: 'https://myshop.com/products/slingshot.jpg',
          otherImages: ['https://myshop.com/products/slingshot-1.jpg','https://myshop.com/products/slingshot-2.jpg'],
          keywords: ['slingshot','vandalism','whyareyoubuyingthesetogether'],
          quantity: 2,
          price: '34.00',
          keywords: 3454354345
        }]
      }

      try {
        validateAddItems(invalidInput)
      } catch (err) {
        expect(err.message).toBe('Input error: expected number to be array')
      }
    })

    it('works normally when input is valid', () => {
      validateAddItems(validInput)
    })
  })
})