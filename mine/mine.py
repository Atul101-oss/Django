

def makeBoard(n):
    return [[0 for i in range(n)] for j in range(n)]

def display(board):
    n=len(board)
    print("+---"*n+"+")
    for row in board:
        for elem in row:
            print(f"| {elem} ",end="")
        print("|")
        print("+---"*n+"+")

def mineCount(rowO,colO,board):
    n=len(board)-1
    row=rowO;col=colO
    for i in [-1,0,1]:
        for j in [-1,0,1]:
            row+=i;col+=j
            
            if row<0 or row>n:
                row=rowO
                continue
            if col<0 or col>n:
                col=colO
                continue

            if board[row][col]==9:
                board[rowO][colO]+=1
            row=rowO
            col=colO

def mine(board):
    n=len(board)
    for i in range(n):
        for j in range(n):
            if board[i][j] != 9:
                mineCount(i,j,board)

def uncover(row,col,board,uboard):
    n=len(board)
    if board[row][col] != 9:
        print("+---"*n+"+")
        uboard[row][col]=board[row][col]
        for urow in uboard:
            for uelem in urow:
                    print(f"| {uelem} ",end="")
            print("|")
            print("+---"*n+"+")
        print()
        return True
    else:
        print("Game Over!")
        return False

def main():  
    n=int(input("Enter grid: "))
    uboard = [[" " for i in range(n)] for j in range(n)]
    board = makeBoard(n)
    
    board[0][2]=9;board[1][3]=9;board[3][3]=9;board[2][3]=9
    # display(board)
    mine(board)
    display(uboard)
    print("\n")
    while(True):
        row,col = map(int, input("Enter P : ").split())
        if not uncover(row-1,col-1,board,uboard):
            display(board)
            break
# mines = [(0,0),(2,6)]
main()