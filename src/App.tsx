import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  Calendar as CalendarIcon, 
  Hash, 
  Sparkles, 
  RefreshCcw, 
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Fingerprint,
  Zap,
  Eye,
  Activity
} from 'lucide-react'
import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import './App.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getGeminiReport, AVAILABLE_MODELS } from '@/lib/gemini'
import type { GeminiReport } from '@/types/gemini'

const formSchema = z.object({
  dob: z.string().min(1, { message: "Date of Birth is required." }),
  secondNumber: z.string().min(1, { message: "Numeric string is required." }).regex(/^\d+$/, { message: "Only numbers are allowed." }),
  secondLabel: z.string().min(1, { message: "Relation is required." }),
  thirdNumber: z.string().min(1, { message: "Numeric string is required." }).regex(/^\d+$/, { message: "Only numbers are allowed." }),
  thirdLabel: z.string().min(1, { message: "Relation is required." }),
  model: z.string(),
})

type FormValues = z.infer<typeof formSchema>

function App() {
  const [aiReport, setAiReport] = useState<GeminiReport | null>(null)
  const [isCalculated, setIsCalculated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: '',
      secondNumber: '',
      secondLabel: '',
      thirdNumber: '',
      thirdLabel: '',
      model: 'gemini-1.5-flash',
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsGenerating(true)
    setError(null)
    
    try {
      // Get AI Report
      const report = await getGeminiReport({
        userName: 'User', // Could be added to form later
        dob: values.dob,
        string1: { value: values.secondNumber, label: values.secondLabel || 'Input 1' },
        string2: { value: values.thirdNumber, label: values.thirdLabel || 'Input 2' },
      }, values.model)

      setAiReport(report)
      setIsCalculated(true)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  const reset = () => {
    setAiReport(null)
    setIsCalculated(false)
    setError(null)
    form.reset()
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="mb-12 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-linear-to-r from-white via-primary to-white uppercase">
          Digital I Ching
        </h1>
        <p className="text-muted-foreground text-lg italic opacity-80">
          Unlocking your numerical DNA through ancient wisdom and precision analysis.
        </p>
      </header>

      <AnimatePresence mode="wait">
        {!isCalculated ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="glass overflow-hidden border-primary/20 shadow-2xl">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-black uppercase tracking-tighter">Divine Parameters</CardTitle>
                <CardDescription className="opacity-70">Enter your foundational data to initiate the calculation sequence.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
                            <CalendarIcon className="h-4 w-4" /> 1. Date of Birth (Static Fate)
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full bg-white/5 border-white/10 h-14 focus:ring-primary/50 transition-all rounded-2xl text-lg font-bold px-4 justify-start text-left",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(parseISO(field.value), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value ? parseISO(field.value) : undefined}
                                onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                captionLayout='dropdown'
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-red-400 font-bold" />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-6 pt-8 border-t border-white/5">
                      <FormLabel className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-accent">
                        <Hash className="h-4 w-4" /> 2 & 3. Dynamic Strings (Custom Magnetic Fields)
                      </FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name="secondNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    placeholder="Numeric String (ID, Plate, etc.)" 
                                    {...field}
                                    className="bg-white/5 border-white/10 h-12 rounded-xl font-mono"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400 text-[10px]" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="secondLabel"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    placeholder="Relation (e.g. My Car, House Unit)" 
                                    {...field}
                                    className="bg-white/5 border-white/10 h-10 text-xs rounded-xl opacity-50 px-4"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400 text-[10px]" />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name="thirdNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    placeholder="Numeric String (Mobile, Serial, etc.)" 
                                    {...field}
                                    className="bg-white/5 border-white/10 h-12 rounded-xl font-mono"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400 text-[10px]" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="thirdLabel"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    placeholder="Relation (e.g. Work Phone, Main Contact)" 
                                    {...field}
                                    className="bg-white/5 border-white/10 h-10 text-xs rounded-xl opacity-50 px-4"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-400 text-[10px]" />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem className="space-y-3 pt-6 border-t border-white/5">
                          <FormLabel className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-primary">
                            <Zap className="h-4 w-4" /> AI Oracle Selection
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full bg-white/5 border-white/10 h-14 focus:ring-primary/50 transition-all rounded-2xl text-lg font-bold px-4 hover:bg-white/10 cursor-pointer">
                                <SelectValue placeholder="Select an AI Oracle" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 border-white/10">
                              {AVAILABLE_MODELS.map((model) => (
                                <SelectItem key={model.id} value={model.id} className="text-white focus:bg-primary focus:text-white">
                                  <div className="flex flex-col">
                                    <span className="font-bold">{model.name}</span>
                                    <span className="text-[10px] opacity-50">{model.description}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400 text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit"
                      disabled={isGenerating}
                      className="w-full h-16 text-xl font-black bg-primary hover:bg-primary/90 transition-all shadow-[0_20px_40px_-5px_rgba(var(--primary),0.3)] rounded-2xl group mt-4 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <span className="flex items-center gap-2">
                          <RefreshCcw className="h-6 w-6 animate-spin" />
                          Consulting the Oracle...
                        </span>
                      ) : (
                        <>
                          Initiate Multi-Layer Analysis
                          <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                    
                    {error && (
                      <p className="text-red-400 text-sm font-bold text-center mt-4">
                        {error}
                      </p>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          isCalculated && aiReport && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-24 space-y-32"
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
            {/* 1. Life Path & Social Image Analysis */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-primary/20 pb-6">
                <div className="p-3 rounded-2xl bg-primary/20 text-primary shadow-inner">
                  <Fingerprint className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight uppercase">Layer 1: Static Fate</h2>
                  <p className="text-sm text-muted-foreground uppercase tracking-[0.3em] font-bold opacity-60">The Foundation of Being</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass border-white/5 overflow-hidden shadow-2xl">
                  <CardHeader className="bg-primary/5 border-b border-white/5 p-8">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Master Essence</span>
                       <span className="text-xs bg-primary/20 text-primary px-4 py-1.5 rounded-full border border-primary/30 font-black uppercase tracking-widest">Path {aiReport.life_path_analysis.life_path_number.value}</span>
                    </div>
                    <CardTitle className="text-3xl font-black">{aiReport.life_path_analysis.life_path_number.archetype}</CardTitle>
                    <CardDescription className="text-primary font-bold text-xl italic mt-2 opacity-90">
                      "{aiReport.life_path_analysis.life_path_number.archetype}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8 p-8">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/10 font-mono text-sm shadow-inner group transition-all hover:border-primary/30">
                      <div className="text-[10px] text-muted-foreground mb-4 uppercase font-black tracking-[0.3em] flex items-center justify-between">
                        <span>Reduction Sequence</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-primary font-black mt-4 text-xl tracking-tighter">
                          Ultimate Archetype Index: {aiReport.life_path_analysis.life_path_number.calculation_steps}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2">
                          <Eye className="h-4 w-4" /> Innate Character Profile
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {aiReport.life_path_analysis.life_path_number.traits.map((trait, i) => (
                            <span key={i} className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full text-foreground/70 font-bold uppercase tracking-widest">
                              {trait}
                            </span>
                          ))}
                        </div>
                        <p className="text-foreground/80 leading-relaxed text-base font-medium">{aiReport.life_path_analysis.life_path_number.detailed_analysis}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-4xl bg-green-500/4 border border-green-500/10 shadow-inner group hover:bg-green-500/8 transition-all">
                          <h4 className="text-[10px] font-black text-green-400 uppercase tracking-[0.3em] mb-4">Core Strengths</h4>
                          <div className="space-y-1">
                            {aiReport.life_path_analysis.life_path_number.strengths.map((s, i) => (
                              <p key={i} className="text-sm leading-relaxed opacity-80 font-medium">• {s}</p>
                            ))}
                          </div>
                        </div>
                        <div className="p-6 rounded-4xl bg-red-500/4 border border-red-500/10 shadow-inner group hover:bg-red-500/8 transition-all">
                          <h4 className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em] mb-4">Innate Hurdles</h4>
                          <div className="space-y-1">
                            {aiReport.life_path_analysis.life_path_number.weaknesses.map((w, i) => (
                              <p key={i} className="text-sm leading-relaxed opacity-80 font-medium">• {w}</p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-3 flex items-center gap-2 opacity-80">
                          <Zap className="h-4 w-4" /> The Soul's Silent Narrative
                        </h4>
                        <p className="text-lg italic opacity-90 border-l-4 border-primary/20 pl-6 font-serif leading-relaxed">{aiReport.life_path_analysis.life_path_number.hidden_desire}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-white/5 bg-primary/1 flex flex-col items-center text-center p-8 shadow-2xl">
                  <div className="w-full flex items-center gap-2 justify-center mb-10 pb-6 border-b border-white/5">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    <h3 className="text-xs font-black uppercase tracking-[0.4em]">Social Mask</h3>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-center items-center py-10">
                    <div className="relative group">
                      <div className="absolute inset-0 blur-[60px] bg-primary/30 rounded-full group-hover:bg-primary/50 transition-all duration-1000" />
                      <div className="relative text-8xl font-black text-white drop-shadow-[0_0_30px_rgba(var(--primary),0.8)] transition-transform duration-700 group-hover:scale-110">
                        {aiReport.life_path_analysis.fixed_number.value}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono opacity-40 mt-10 bg-white/5 px-5 py-2 rounded-full border border-white/5">
                      {aiReport.life_path_analysis.fixed_number.calculation_steps}
                    </div>
                  </div>

                  <div className="space-y-6 w-full mt-auto">
                    <div className="p-6 rounded-3xl bg-black/40 border border-white/5 text-sm leading-relaxed text-left shadow-inner">
                      <span className="font-black text-primary block mb-3 uppercase tracking-widest text-[10px]">{aiReport.life_path_analysis.fixed_number.social_image}:</span>
                      {aiReport.life_path_analysis.fixed_number.detailed_analysis}
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic opacity-40 uppercase tracking-tighter">
                      {aiReport.life_path_analysis.fixed_number.description}
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            {/* 2. I Ching 'DNA' Analysis of Digital Strings */}
            <section className="space-y-10">
              <div className="flex items-center gap-4 border-b border-accent/20 pb-6">
                <div className="p-3 rounded-2xl bg-accent/20 text-accent shadow-inner">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight uppercase">Layer 2: Dynamic DNA</h2>
                  <p className="text-sm text-muted-foreground uppercase tracking-[0.3em] font-bold opacity-60">The Flow of Numeric Energy</p>
                </div>
              </div>

              {/* Special Symbols Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="glass p-5 rounded-3xl border-white/5 flex items-center gap-6 bg-white/1 shadow-xl">
                  <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-primary text-2xl border border-primary/20 shadow-inner">0</div>
                  <div className="text-xs">
                    <span className="font-black text-primary block uppercase tracking-tighter mb-1 text-sm">Concealment Rule</span>
                    The 0 acts as a "Mantle of Invisibility," concealing the energy of the adjacent digit.
                  </div>
                </div>
                <div className="glass p-5 rounded-3xl border-white/5 flex items-center gap-6 bg-white/1 shadow-xl">
                  <div className="h-12 w-12 shrink-0 rounded-2xl bg-accent/10 flex items-center justify-center font-black text-accent text-2xl border border-accent/20 shadow-inner">5</div>
                  <div className="text-xs">
                    <span className="font-black text-accent block uppercase tracking-tighter mb-1 text-sm">Bridge Rule (Multiplier)</span>
                    The 5 acts as a "Bridge," strengthening the connection between digits and amplifying the pairing.
                  </div>
                </div>
              </div>

              <div className="space-y-20 pt-6">
                {[
                  aiReport.iching_dna_analysis.string_1_analysis,
                  aiReport.iching_dna_analysis.string_2_analysis
                ].map((item, idx) => (
                  <div key={idx} className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-accent/40 pl-8 transition-all group hover:border-accent">
                      <div className="space-y-1">
                        <div className="flex items-center gap-4">
                          <Fingerprint className="h-8 w-8 text-accent animate-pulse" />
                          <h3 className="text-3xl font-black tracking-tight uppercase group-hover:text-accent transition-colors">{item.label}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground italic font-semibold opacity-70 tracking-tight">Numerical Analysis of Dynamic String</p>
                      </div>
                      <div className="text-2xl font-mono bg-accent/10 text-accent px-8 py-4 rounded-4xl border border-accent/20 font-black shadow-2xl tracking-[0.2em] transform transition-transform group-hover:scale-105">
                        {item.input}
                      </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-accent/5 border border-accent/10 mb-8">
                       <p className="text-foreground/80 leading-relaxed text-base font-medium">{item.detailed_summary}</p>
                    </div>

                    {item.pairs.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {item.pairs.map((p, pIdx) => (
                          <motion.div 
                            key={pIdx}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`p-8 rounded-[2.5rem] border-2 flex flex-col gap-5 group relative overflow-hidden transition-all duration-700 shadow-2xl ${
                              p.type === 'Auspicious' 
                                ? 'bg-green-500/2 border-green-500/10 hover:border-green-500/40 hover:bg-green-500/8' 
                                : 'bg-red-500/2 border-red-500/10 hover:border-red-500/40 hover:bg-red-500/8'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col gap-1.5">
                                <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${p.type === 'Auspicious' ? 'text-green-400' : 'text-red-400'}`}>
                                  {p.name_en} ({p.name_cn})
                                </span>
                                <span className="text-2xl font-black opacity-95">{p.attribute}</span>
                              </div>
                              <div className="text-4xl font-black font-mono opacity-15 group-hover:opacity-100 transition-all duration-1000 bg-clip-text text-transparent bg-linear-to-br from-white to-white/0">
                                {p.pair}
                              </div>
                            </div>
                            <p className="text-sm leading-relaxed opacity-70 font-medium">{p.meaning}</p>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-20 rounded-[3rem] bg-white/1 border-2 border-dashed border-white/5 text-center space-y-4">
                        <div className="text-muted-foreground opacity-10 flex justify-center"><Hash className="h-20 w-20" /></div>
                        <p className="text-muted-foreground text-sm font-black uppercase tracking-[0.2em] opacity-50">No Significant Latent Energy Links Detected</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Summary of 'Shu' */}
            <section className="space-y-10 pt-10">
              <div className="flex items-center gap-4 border-b border-primary/20 pb-6">
                <div className="p-3 rounded-2xl bg-primary/20 text-primary shadow-inner">
                  <Eye className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight uppercase">Layer 3: Synthesis</h2>
                  <p className="text-sm text-muted-foreground uppercase tracking-[0.3em] font-bold opacity-60">The Final Verdict of Shu</p>
                </div>
              </div>

              <Card className="glass border-primary/10 hover:border-primary/20 transition-all overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] rounded-[3rem]">
                <CardContent className="p-10 md:p-16 space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                      <div className="space-y-6">
                        <h4 className="text-2xl font-black flex items-center gap-4 uppercase tracking-tighter">
                          <Activity className="h-8 w-8 text-primary shadow-sm" /> The Field Interaction
                        </h4>
                        <p className="text-lg leading-relaxed text-foreground/80 font-medium opacity-90">
                          {aiReport.shu_summary.interaction}
                        </p>
                      </div>

                      <div className="glass p-10 rounded-[2.5rem] border-white/5 space-y-8 bg-primary/2 shadow-inner">
                        <h4 className="text-[11px] font-black text-primary flex items-center gap-3 uppercase tracking-[0.4em]">
                          <Zap className="h-5 w-5" /> Synthesis Deduction
                        </h4>
                        <ul className="space-y-6">
                          <li className="text-base flex gap-5">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary shrink-0 mt-2.5 shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
                            <span className="opacity-90 font-medium leading-relaxed">
                              Your path is {aiReport.life_path_analysis.life_path_number.archetype}.
                            </span>
                          </li>
                          <li className="text-base flex gap-5">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary shrink-0 mt-2.5 shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
                            <span className="opacity-90 font-medium leading-relaxed">
                              Current environment: {aiReport.iching_dna_analysis.string_1_analysis.detailed_summary.slice(0, 100)}...
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center">
                      {(() => {
                        const verdict = aiReport.shu_summary.verdict;
                        let color = "yellow";
                        let Icon = RefreshCcw;
                        let detail = "Dynamic Stasis Detected";

                        if (verdict === 'ADVANCE') {
                          color = "green";
                          Icon = TrendingUp;
                          detail = "Auspicious Magnetic Alignment";
                        } else if (verdict === 'RETREAT') {
                          color = "red";
                          Icon = TrendingDown;
                          detail = "Volatile Field Conflict";
                        }

                        return (
                          <motion.div 
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`p-12 rounded-[4rem] border-2 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.7)] relative overflow-hidden flex flex-col items-center text-center gap-10 group ${
                              color === 'green' ? 'bg-green-500/8 border-green-500/30' :
                              color === 'red' ? 'bg-red-500/8 border-red-500/30' :
                              'bg-yellow-500/8 border-yellow-500/30'
                            }`}
                          >
                            <div className={`h-32 w-32 rounded-[2.5rem] flex items-center justify-center shadow-2xl shrink-0 transition-all duration-1000 group-hover:rotate-360 group-hover:scale-110 ${
                              color === 'green' ? 'bg-linear-to-br from-green-500 to-green-700 shadow-green-500/50' : 
                              color === 'red' ? 'bg-linear-to-br from-red-500 to-red-700 shadow-red-500/50' : 
                              'bg-linear-to-br from-yellow-500 to-yellow-700 shadow-yellow-500/50'
                            }`}>
                              <Icon className="h-16 w-16 text-white" />
                            </div>
                            <div className="space-y-4">
                              <span className={`text-[11px] font-black uppercase tracking-[0.5em] ${
                                color === 'green' ? 'text-green-400' : 
                                color === 'red' ? 'text-red-400' : 
                                'text-yellow-400'
                              }`}>{detail}</span>
                              <h4 className={`text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none ${
                                color === 'green' ? 'text-green-400' : 
                                color === 'red' ? 'text-red-400' : 
                                'text-yellow-400'
                              }`}>
                                {verdict}
                              </h4>
                              <p className="text-base md:text-lg font-bold opacity-80 leading-relaxed max-w-sm mx-auto tracking-tight">
                                {aiReport.shu_summary.guidance}
                              </p>
                            </div>
                          </motion.div>
                        )
                      })()}
                    </div>
                  </div>

                  <div className="pt-16 border-t border-white/10 flex flex-col sm:flex-row gap-8">
                    <Button variant="outline" onClick={reset} className="flex-1 h-20 rounded-3xl border-white/10 hover:bg-white/10 text-xl font-black uppercase tracking-widest group transition-all duration-500">
                      <RefreshCcw className="mr-4 h-6 w-6 transition-transform group-hover:rotate-180 duration-1000" /> Reset Sequence
                    </Button>
                    <Button className="flex-1 h-20 rounded-3xl bg-primary hover:bg-primary/90 text-white text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/40 active:scale-95 transition-all duration-500">
                      Export Detailed Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            </motion.div>
          )
        )}
      </AnimatePresence>

      <footer className="mt-24 text-center text-muted-foreground text-[10px] opacity-30 uppercase tracking-[0.5em] pb-12">
        <p>© {new Date().getFullYear()} Shuzi Yijing Protocol. Absolute Confidentiality Guaranteed.</p>
      </footer>
    </div>
  )
}

export default App
