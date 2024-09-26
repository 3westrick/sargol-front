import {atom} from 'jotai'

export const methods_id = atom<any>(null);
export const methods_atom = atom<any>([]);
export const method_type_atom =  atom<any>('free_shipping');
export const method_name_atom = atom<any>('');
export const method_taxable_atom = atom<any>(false);
export const method_free_shipping_requirements_atom = atom<any>('none');
export const method_minimum_order_amount_atom = atom<any>(0);
export const method_flate_rate_cost_atom = atom<any>(0);
export const method_local_pickup_cost_atom = atom<any>(0);
export const method_shipping_classes_atom = atom<any>({});

export const method_edit_modal_open_atom = atom<any>(false);
export const method_delete_atom = atom<any>([]);

export const shipping_options = atom<any>([]);