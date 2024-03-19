import {atom} from 'jotai'

export const admin_drawer_attribue = atom<any>(null)
export const admin_drawer_value = atom<any>(null)
export const admin_drawer_category = atom<any>(null)

export const admin_snackbar = atom({
    state: false,
    message: ""
})

// admin product
export const admin_product_title = atom('')
export const admin_product_slug = atom('')

export const admin_product_regular_price = atom<number|string>(0)
export const admin_product_sale_price = atom<number|string>(0)
export const admin_product_tax_status = atom('none')
export const admin_product_tax_class = atom('none')
export const admin_product_description = atom('')
export const admin_product_SKU = atom('')
export const admin_product_MPN = atom('')
export const admin_product_stock = atom('in_stock')
export const admin_product_quantity = atom<number|string>(0)
export const admin_product_unit= atom('')

export const admin_product_weight= atom('')
export const admin_product_width= atom('')
export const admin_product_height= atom('')
export const admin_product_length= atom('')
export const admin_product_shipping_class= atom('no_shipping_class')

export const admin_product_attributes = atom<any>([])
export const admin_product_attributes_visible = atom<any>({})
export const admin_product_attributes_variant = atom<any>({})
export const admin_product_values = atom<any>({})
export const admin_product_variants = atom<any>([])

export const admin_product_initial_data = {
    regular_price: 0,
    sale_price: 0,
    tax_status: '',
    tax_class: '',
    description: '',
    short_description: '',
    SKU: '',
    MPN: '',
    quantity: 0,
    unit: '',
}

export const admin_product = atom({
    regular_price: 0,
    sale_price: 0,
    tax_status: '',
    tax_class: '',
    description: '',
    short_description: '',
    SKU: '',
    MPN: '',
    quantity: 0,
    unit: '',
})