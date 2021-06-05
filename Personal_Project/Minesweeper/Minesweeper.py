from tkinter import ttk
from tkinter import messagebox

import tkinter as tk
import threading
import time
import random

#게임 화면
def minesweeper(level):
    global thread
    minesweeper_window=tk.Tk()
    minesweeper_window.title("게임 시작!!")
    def restart():
        minesweeper_window.destroy()
        return minesweeper(level)
    if level==1:
        minesweeper_window.geometry("300x370")
        mine_num=10
        size_x=9
        size_y=9
    elif level==2:
        minesweeper_window.geometry("490x570")
        mine_num=40
        size_x=16
        size_y=16
    else:
        minesweeper_window.geometry("900x590")
        mine_num=99
        size_x=30
        size_y=16


    #새 게임 시작하기(난이도 선택 화면으로)
    def newgame():
        minesweeper_window.destroy()
        main()

    top_menu=tk.Frame(minesweeper_window)
    top_menu.pack()
    game=tk.Frame(minesweeper_window)
    game.pack()

    restartbutton=ttk.Button(top_menu,text="다시하기",command=restart)
    restartbutton.pack(side="left")
    newgamebutton=ttk.Button(top_menu,text="새 게임",command=newgame)
    newgamebutton.pack(side="right")
    

    #second=0
    #timer=tk.Label(top_menu,text=second,width=10,height=5,foreground="red",font=20)
    #timer.pack()
    def starttimer():
        second=0
        while True:
            timer=tk.Label(top_menu,text=second,width=10,height=5,foreground="red",font=20)
            timer.pack()
            second+=1
            time.sleep(1)
            timer.destroy()
    thread=threading.Thread(target=starttimer)
    thread.start()


    #지뢰 랜덤생성
    mines=[]
    while len(mines)<mine_num:
        temp=[random.randrange(0,size_y),random.randrange(0,size_x)]
        if temp not in mines:
            mines.append(temp)

    #버튼 인덱스 구하는 함수
    def findindex(x,y):
        #x,y는 좌표, 난이도에 따라 좌표로 인덱스를 구분짓고 리턴
        return [0,0]

    #지뢰 갯수 찾기
    def count_mine(x,y):
        cnt=0
        for i in mines:
            if abs(i[0]-y)<=1 and abs(i[1]-x)<=1:
                cnt+=1
        return cnt

    #공백 버튼 펼치기
    def spread(x,y):
        blank_queue=[[x,y]]
        dir=[[-1,0],[0,1],[1,0],[0,-1]]
        while len(blank_queue)>0:
            tempx,tempy=blank_queue.pop(0)
            for i in dir:
                if tempy+i[0]>=0 and tempy+i[0]<size_y and tempx+i[1]>=0 and tempx+i[1]<size_x and btn[tempy+i[0]][tempx+i[1]]['text']!="공백":
                    if count_mine(tempx+i[1],tempy+i[0])>0:
                        #버튼 비활성화 추가
                        btn[tempy+i[0]][tempx+i[1]]['text']=count_mine(tempx+i[1],tempy+i[0])
                    else:
                        #버튼 비활성화 추가
                        btn[tempy+i[0]][tempx+i[1]]['text']="공백"
                        blank_queue.append([tempx+i[1],tempy+i[0]])


    #블럭 이미지 변경 오류(PIL _imaging오류)
    def sign(b,x,y):
        global thread
        if b==1:
            if [y,x] in mines:
                #모든 지뢰 출력
                for i in mines:
                    btn[i[0]][i[1]]['text']="지뢰"
                messagebox.showinfo("Gameover","지뢰를 눌렀습니다!")
                restart()
            else:
                adjacent_mines=count_mine(x,y)
                if adjacent_mines:
                    btn[y][x]['text']=adjacent_mines
                else:
                    btn[y][x]['text']="공백"
                    spread(x,y)
        elif b==3:
            print("오른쪽버튼",x,y)
            #btn[y][x]['image']=tk.PhotoImage(file="./Minesweeper/question.png")
        #img = Image.open('minesweeper/question.png')
        #image = img.resize((2, 1), Image.ANTIALIAS)
        #resized_image = ImageTk.Photoimage(image)
        #img=ImageTk.PhotoImage(Image.open("minesweeper/question.png"))
    

    #지뢰 평상시 : raised, Hover 시 : groove, 선택완료시 : ridge(선택불가능 추가)

    #btn=[tk.Button(game,width=2,height=1,bd=3,relief="raised",overrelief="groove") for i in range(size_y*size_x)]
    #btn_index=0
    #for i in range(size_y):
    #    for j in range(size_x):
    #        btn[btn_index].bind("<Button-3>",sign)
    #        btn[btn_index].grid(row=i,column=j)
    #        btn_index+=1


    btn=[[tk.Button(game,width=2,height=1,bd=3,relief="raised",overrelief="groove") for i in range(size_x)]for j in range(size_y)]
    btn_index=0
    for i in range(size_y):
        for j in range(size_x):
            #lambda 첫번째 인자는 클릭 이벤트가 저장됨(이유는 모르겠음, 두번째 파라미터부터 원하는 변수가 저장됨)
            btn[i][j].bind("<Button-1>",lambda event,b=1,x=j,y=i:sign(b,x,y))
            btn[i][j].bind("<Button-3>",lambda event,b=3,x=j,y=i:sign(b,x,y))
            btn[i][j].grid(row=i,column=j)
           
   

    minesweeper_window.mainloop()

#난이도 선택 화면
class Start:
    def __init__(self,parent):   
        self.parent=parent
        parent.geometry("300x200")
        parent.title("시작 화면")
        parent.resizable(False,False)  
        self.level=tk.IntVar()
        self.lever1=ttk.Radiobutton(parent,text="초급",variable=self.level,value=1)
        self.lever1.pack(side="top",pady=10)
        self.lever2=ttk.Radiobutton(parent,text="중급",variable=self.level,value=2)
        self.lever2.pack(side="top",pady=10)
        self.lever3=ttk.Radiobutton(parent,text="고급",variable=self.level,value=3)
        self.lever3.pack(side="top",pady=10)
    
        self.action=ttk.Button(parent,text="게임시작!!",command=self.select_mode)
        self.action.pack(side="top",pady=10)
    def select_mode(self):
        if self.level.get()==1 or self.level.get()==2 or self.level.get()==3 :
            self.parent.destroy()
            minesweeper(self.level.get())
        else:
            messagebox.showinfo(title="오류",message="난이도를 선택하세요") 

def main():
    root=tk.Tk()
    start=Start(root)
    root.mainloop()

if __name__=="__main__":
    main()