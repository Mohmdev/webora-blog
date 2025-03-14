"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@utils/useDebounce";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";

export const SearchInput: React.FC = () => {
	const [value, setValue] = useState("");
	const router = useRouter();

	const debouncedValue = useDebounce(value);

	useEffect(() => {
		router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ""}`);
	}, [debouncedValue, router]);

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Label htmlFor="search" className="sr-only">
					Search
				</Label>
				<Input
					id="search"
					onChange={(event) => {
						setValue(event.target.value);
					}}
					placeholder="Search"
				/>
				<button type="submit" className="sr-only">
					submit
				</button>
			</form>
		</div>
	);
};
