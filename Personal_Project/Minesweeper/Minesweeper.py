from tkinter import *
from tkinter import ttk
import tkinter as tk

def minesweeper(level):
    minesweeper=tk.Tk()
    minesweeper.title("게임 시작!!")
    def reset():
        minesweeper.quit()      #리셋부분 오류
        minesweeper(level)
    if level==1:
        minesweeper.geometry("250x250")
    elif level==2:
        minesweeper.geometry("400x400")
    else:
        minesweeper.geometry("600x600")

    resetbutton=Button(minesweeper,text="Reset",command=reset).pack()

    minesweeper.mainloop()


def start_minesweeper():   
    start_window=tk.Tk()
    start_window.geometry("300x200")
    start_window.title("시작 화면")
    #start_window.resizable(False,False)
    def select_mode():
        global start_window         #부모창 global 선언
        if level.get()==1 or level.get()==2 or level.get()==3 :
            start_window.quit()
            minesweeper(level.get())
            #start_window.quit()     #부모창 종료안됨
        else:
            print("없음")    

    level=IntVar()
    lever1=ttk.Radiobutton(start_window,text="초급",variable=level,value=1)
    lever1.pack(side="top",pady=10)
    lever2=ttk.Radiobutton(start_window,text="중급",variable=level,value=2)
    lever2.pack(side="top",pady=10)
    lever3=ttk.Radiobutton(start_window,text="고급",variable=level,value=3)
    lever3.pack(side="top",pady=10)
    
    action=ttk.Button(start_window,text="게임시작!!",command=select_mode)
    action.pack(side="top",pady=10)
    start_window.mainloop()


start_minesweeper()