"use client"

import {PortableText} from '@portabletext/react'
import React from 'react'

export default function PortableTextClient({value}: {value: any}) {
  return <PortableText value={value} />
}
