import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  n = 4; // nXn board, n queens

  board: Array<any> = [];

  constructor() {
    this.create2DArray();

    if (!this.setQueens(this.board, 0)) {
      console.log('Solution does not exist');
    }

    console.log(this.board);
  }

  setQueens(board: number[][], col: number): boolean {
    // if col (0 to n-1) has reached this.n
    // so all cols are done, so end of recursion
    if (col >= this.n) return true;

    /* 
      start with [row, col]  as [0,0]
      and 
      more to next col to check the correct position visavis previous cols covered
    */
    for (let row = 0; row < this.n; row++) {
      /* 
      check all els on left
      check upper diagonals [row-1, col-1], [row-2, col-2] etc untill one of row/col reaches 0  / this.n on case of lower rows    
      */
      if (this.isValidPosition(board, row, col)) {
        /* Place this queen in board[row][col] */
        board[row][col] = 1;

        /* recur to place rest of the queens */
        if (this.setQueens(board, col + 1)) {
          return true;
        } else {
          /* If placing queen in board[row][col]
                 doesn't lead to a solution then
                 remove queen from board[row][col] */
          board[row][col] = 0; // BACKTRACK
        }
      }
    }

    return false;
  }

  isValidPosition(board: number[][], row: number, col: number) {
    let i, j;

    /* left els */
    for (i = 0; i < col; i++) if (board[row][i] == 1) return false;

    /*  upper diagonal els on left */
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
      if (board[i][j] == 1) return false;

    /* lower diagonal els on left */
    for (i = row, j = col; j >= 0 && i < this.n; i++, j--)
      if (board[i][j] == 1) return false;

    return true;
  }

  create2DArray() {
    let cols = this.n;
    while (cols > 0) {
      let arr = new Array(this.n).fill(0);
      this.board.push(arr);

      cols--;
    }
    console.log(this.board);
  }
}
