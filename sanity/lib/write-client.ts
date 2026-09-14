import "server-only"

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import {token} from "./token"

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,
})

if(!writeClient.config().token) throw new Error("Write token not found")
