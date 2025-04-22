import { AtomicTemplate } from '../types/atomicApiTypes.ts'

import Placeholder from '../assets/images/placeholder.png'

class TemplatesService {
  getImageLinkToTemplate(template: AtomicTemplate | undefined): string {
    if (!template || !template.immutable_data.img) {
      return Placeholder
    }

    return `https://ipfs.io/ipfs/${template.immutable_data.img}`
  }

  getTemplateLinkOnAtomicHub(template: AtomicTemplate): string {
    return `https://wax.atomichub.io/explorer/template/wax-mainnet/${template.collection.collection_name}/${template.template_id}`
  }
}

export const templatesService = new TemplatesService()
