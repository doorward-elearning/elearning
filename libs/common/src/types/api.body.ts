import DApiBody from '@doorward/common/dtos/body/base.body';


export type ApiBodyProperties<T extends DApiBody> = Omit<T, 'validation'>
