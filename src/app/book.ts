export class IBook {

    private static DEFAULT_NAME = false;

    constructor(
      public title: string,
      public owner: string,
      public thumbnail: string,
      public isTraded: boolean,
      public isApproved: boolean,
      public requester?: string
    ) {
    this.isTraded = IBook.DEFAULT_NAME;
    this.isApproved = IBook.DEFAULT_NAME; 
}
}


// export interface Book {
//   id: string;
//   volumeInfo: {
//     title: string;
//     subtitle: string;
//     authors: string[];
//     publisher: string;
//     publishDate: string;
//     description: string;
//     averageRating: number;
//     ratingsCount: number;
//     imageLinks: {
//       thumbnail: string;
//       smallThumbnail: string;
//     };
//   };
// }
