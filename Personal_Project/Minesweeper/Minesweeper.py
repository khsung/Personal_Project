#from tkinter import *
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
        minesweeper_window.geometry("280x350")
        mine_num=10
        size_x=9
        size_y=9
    elif level==2:
        minesweeper_window.geometry("450x550")
        mine_num=40
        size_x=16
        size_y=16
    else:
        minesweeper_window.geometry("900x600")
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
    
    #지뢰 랜덤생성
    mines=[]
    while len(mines)<mine_num:
        temp=[random.randrange(0,size_y),random.randrange(0,size_x)]
        if temp not in mines:
            mines.append(temp)


    
    

    #지뢰 평상시 : raised, Hover 시 : groove, 선택완료시 : ridge(선택불가능 추가)

    btn=[tk.Button(game,width=2,height=1,bd=3,relief="raised",overrelief="groove") for i in range(size_y*size_x)]
    btn_index=0
    for i in range(size_y):
        for j in range(size_x):
            btn[btn_index].grid(row=i,column=j)
            btn_index+=1
    #def printnum(num):
    #    print(num)

    #btn.append(tk.Button(minesweeper_window,text="",width=2,height=1,bd=3,relief="flat"))
    #btn.append(tk.Button(minesweeper_window,text="",width=2,height=1,bd=3,relief="groove",overrelief="flat"))

    #btn.append(tk.Button(minesweeper_window,text="",width=20,height=20,bd=3,relief="raised",overrelief="groove"))

    #btn.append(tk.Button(minesweeper_window,text="",width=2,height=1,bd=3,relief="ridge"))
    
    #btn.append(tk.Button(minesweeper_window,text="",width=2,height=1,bd=3,relief="solid"))

    #btn.append(tk.Button(minesweeper_window,text="",width=2,height=1,bd=3,relief="sunken"))


    #for i in range(len(btn)):
    #    #btn[i].bind("<ButtonRelease-1>",)
    #    btn[i].pack()


    


    second=0
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