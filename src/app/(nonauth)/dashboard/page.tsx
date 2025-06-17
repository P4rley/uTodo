"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../context/auth";
import IconRenderer from "../../../components/IconRenderer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import DashboardCard from "./components/DashboardCard";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { AddActivitesFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "@/components/ui/select";

const Dashboard = () => {
  const auth = useAuth();

  const form = useForm<z.infer<typeof AddActivitesFormValidation>>({
    resolver: zodResolver(AddActivitesFormValidation),
    defaultValues: {
      title: "",
      category: "",
    },
  });

  const [currentPartOfDay, setCurrentPartOfDay] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState({
    focus: "",
    break: "",
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const time = new Date();

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    if (totalMinutes >= 300 && totalMinutes < 720) {
      setCurrentPartOfDay("Good Morning");
    }

    setCurrentPartOfDay("");
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((val) => val - 1);
        } else if (minutes > 0) {
          setMinutes((val) => val - 1);
          setSeconds(59);
        }

        if (minutes === 0 && seconds === 0) {
          setIsRunning(false);
          audioRef.current?.play();

          setTimeout(() => {
            audioRef.current?.pause();
          }, 5000);

          toast("Take a break", {
            classNames: {
              title: "!text-[#222]",
              description: "!text-slate-400 font-base",
            },
            description: "It's time to take a break and relax",
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setDuration({ ...duration, [e.target.name]: e.target.value });
  };

  const startTimer = () => {
    if (minutes !== 0 || seconds !== 0 || +duration.focus) {
      if (+duration.focus) {
        setMinutes(+duration.focus);
      }
      setDuration({ focus: "", break: "" });
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setDuration({ focus: "", break: "" });
  };

  const onSubmit = async (
    values: z.infer<typeof AddActivitesFormValidation>
  ) => {
    console.log(values);
  };

  return (
    <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_350px] gap-2">
      <div className="overflow-auto">
        {currentPartOfDay && (
          <div className="border border-gray-200 bg-background p-4 rounded-md w-full h-[90px]">
            {auth?.currentUser?.displayName ? (
              <p className="text-2xl">
                {currentPartOfDay},{" "}
                {auth?.currentUser?.displayName?.split(" ")[1]}!
              </p>
            ) : (
              ""
            )}

            <p className="text-sm text-gray-400">
              What do you plan to do today?
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="header">Today Activities</h2>
            <span className="text-sm font-light">
              Manage your habits, reminders, events, and activites.
            </span>
          </div>

          <Dialog
            onOpenChange={(open) => {
              if (!open) form.reset();
            }}
          >
            <DialogTrigger asChild>
              <Button className="cursor-pointer">
                <IconRenderer iconName="FaPlus" iconPack="fa" />
                <p>New Activity</p>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Add Activity</DialogTitle>
                    <DialogDescription>
                      Make new habits, reminders, events, or activites, Click
                      save when you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <CustomFormField
                      control={form.control}
                      name="title"
                      label="Title"
                      fieldType={FormFieldType.INPUT}
                      placeholder="Title"
                    />

                    <CustomFormField
                      control={form.control}
                      name="category"
                      label="Category"
                      fieldType={FormFieldType.SELECT}
                      placeholder="Select Category"
                    >
                      {["Habits", "Reminders", "Events", "Activities"].map(
                        (category, i) => (
                          <SelectItem key={i} value={category}>
                            <div className="flex cursor-pointer items-center gap-2">
                              {/* <Image
                              src={doctor.image}
                              width={32}
                              height={32}
                              alt="doctor"
                              className="rounded-full border border-dark-500"
                            /> */}
                              <p>{category}</p>
                            </div>
                          </SelectItem>
                        )
                      )}
                    </CustomFormField>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </FormProvider>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <h2 className="sub-header">Your Habits</h2>

          {[1, 2, 3].map((el, i) => (
            <DashboardCard key={i} />
          ))}
        </div>
      </div>

      <div className="w-full lg:pl-4">
        <div className="bg-[#222] w-full rounded-md p-4 text-white">
          <p className="text-2xl">Focus Mode</p>
          <p className="text-xs text-gray-400">Stay focused for</p>

          <div className="flex items-center justify-between my-5 ">
            <div className="flex items-center">
              <p className="text-3xl font-bold outline-none border-none">
                {String(minutes).padStart(2, "0")}
              </p>
              <span className="mx-1 text-2xl font-bold">:</span>
              <p className="text-3xl font-bold outline-none border-none">
                {String(seconds).padStart(2, "0")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isRunning ? (
                <div
                  onClick={pauseTimer}
                  className="border cursor-pointer border-slate-100 px-2 py-1 rounded-md bg-background flex items-center gap-2"
                >
                  <IconRenderer
                    iconName="IoPauseCircleOutline"
                    iconPack="io5"
                    className="text-xl text-foreground"
                  />
                  <span className="text-xs text-foreground font-semibold">
                    Take a break
                  </span>
                </div>
              ) : (
                <div
                  className="border cursor-pointer border-slate-100 px-2 py-1 rounded-md bg-background flex items-center gap-2"
                  onClick={startTimer}
                >
                  <IconRenderer
                    iconName="IoIosPlayCircle"
                    iconPack="io"
                    className="text-xl text-foreground"
                  />
                  <span className="text-xs text-foreground font-semibold">
                    Focus
                  </span>
                </div>
              )}

              <IconRenderer
                iconName="FaRegStopCircle"
                iconPack="fa"
                className="text-xl text-background cursor-pointer"
                onClick={handleStopTimer}
              />
            </div>
          </div>

          <div className="bg-white rounded-md p-4 text-black flex gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="focusDuration">Focus duration</Label>
              <Input
                id="focusDuration"
                type="number"
                placeholder="0 min"
                name="focus"
                value={duration.focus}
                onChange={handleDuration}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="breakDuration">Break duration</Label>
              <Input
                id="breakDuration"
                type="number"
                placeholder="0 min"
                name="break"
                value={duration.break}
                onChange={handleDuration}
              />
            </div>
          </div>
        </div>

        <audio controls className="hidden" ref={audioRef}>
          <source src="alarm.wav" type="audio/wav" />
        </audio>
      </div>
    </div>
  );
};

export default Dashboard;
