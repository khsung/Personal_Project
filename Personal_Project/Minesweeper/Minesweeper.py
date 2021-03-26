from tkinter import *
from tkinter import ttk
from tkinter import messagebox
import threading
import time

def minesweeper(level):
    global thread
    minesweeper=Tk()
    minesweeper.title("게임 시작!!")
    def reset():
        
        minesweeper.destroy()      #리셋부분 오류
        main()
        #return minesweeper(level)
    if level==1:
        minesweeper.geometry("250x250")
    elif level==2:
        minesweeper.geometry("400x400")
    else:
        minesweeper.geometry("600x600")

    resetbutton=ttk.Button(minesweeper,text="Reset",command=reset)
    resetbutton.pack()
    print(type(resetbutton))
    #resetbutton.bind("<Enter>",lambda x:resetbutton.config(bg='black'))
    second=0
    def starttimer():
        second=0
        while True:
            timer=Label(minesweeper,text=second,width=10,height=5,foreground="red",font=20)
            timer.pack()
            second+=1
            time.sleep(1)
            timer.destroy()
    thread=threading.Thread(target=starttimer).start()

    minesweeper.mainloop()

class Start:
    def __init__(self,parent):   
        self.parent=parent
        parent.geometry("300x200")
        parent.title("시작 화면")
        parent.resizable(False,False)  
        self.level=IntVar()
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
    root=Tk()
    start=Start(root)
    root.mainloop()

if __name__=="__main__":
    main()