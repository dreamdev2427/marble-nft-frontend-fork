export interface NftInfo {
    readonly tokenId: string;
    readonly image: string;
    readonly title: string;
    readonly user: string;
    readonly price: string;
    readonly total: number;
    readonly collectionName: string;
}
export interface NftCategory {
    readonly id: string;
    readonly url: string;
    readonly name: string;
}
export interface NftCollection {
    readonly address: string;
    readonly url: string;
    readonly imgUrl: string;
    readonly bannerUrl: string;
    readonly name: string;
    readonly symbol: string;
    readonly description: string;
    readonly creator: string;
}