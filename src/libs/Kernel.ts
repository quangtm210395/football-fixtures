import { Service } from 'typedi';

import BootstrapProvider from '@Providers/BootstrapProvider';
import HttpProvider from '@Providers/HttpProvider';
import CacheProvider from '@Providers/CacheProvider';
import TypeORMProvider from '@Providers/TypeORMProvider';

export class Kernel {
  //provider register
  public static providers = [
    BootstrapProvider,
    CacheProvider,
    TypeORMProvider,
    HttpProvider,
  ];
}
